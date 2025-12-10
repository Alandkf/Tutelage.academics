const { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');

function r2Config() {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;
  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) return null;
  const client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
  return { client, bucket };
}

function uniqueName(originalName) {
  const ext = (originalName || '').split('.').pop().toLowerCase();
  const base = crypto.randomUUID();
  const date = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  return `pdfs/${date}/${base}${ext ? '.' + ext : ''}`;
}

async function uploadPdfBuffer(buffer, originalName, meta = {}) {
  const cfg = r2Config();
  if (!cfg) throw new Error('R2 is not configured');
  const key = uniqueName(originalName || 'document.pdf');
  const put = new PutObjectCommand({
    Bucket: cfg.bucket,
    Key: key,
    Body: buffer,
    ContentType: 'application/pdf',
    Metadata: Object.fromEntries(Object.entries(meta).map(([k,v]) => [String(k), String(v)])),
  });
  await cfg.client.send(put);
  return { key };
}

async function signDownloadUrl(key, expiresSeconds = 900) {
  const cfg = r2Config();
  if (!cfg) throw new Error('R2 is not configured');
  const cmd = new GetObjectCommand({ Bucket: cfg.bucket, Key: key });
  const url = await getSignedUrl(cfg.client, cmd, { expiresIn: expiresSeconds });
  return url;
}

async function head(key) {
  const cfg = r2Config();
  const cmd = new HeadObjectCommand({ Bucket: cfg.bucket, Key: key });
  return await cfg.client.send(cmd);
}

async function list(prefix = 'pdfs/') {
  const cfg = r2Config();
  const cmd = new ListObjectsV2Command({ Bucket: cfg.bucket, Prefix: prefix });
  return await cfg.client.send(cmd);
}

async function remove(key) {
  const cfg = r2Config();
  const cmd = new DeleteObjectCommand({ Bucket: cfg.bucket, Key: key });
  return await cfg.client.send(cmd);
}

module.exports = { uploadPdfBuffer, signDownloadUrl, head, list, remove, r2Config };

function publicUrlForKey(key) {
  const base = process.env.R2_PUBLIC_BASE_URL;
  if (!base) return null;
  const trimmed = base.replace(/\/$/, '');
  return `${trimmed}/${key}`;
}

module.exports.publicUrlForKey = publicUrlForKey;
