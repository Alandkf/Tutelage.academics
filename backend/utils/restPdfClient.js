// ============================================================================
// RestPDF Client Utility
// ============================================================================
// Provides helper functions to upload PDF buffers to the external RestPDF
// service. Configuration is driven by environment variables so that the
// actual endpoint and authentication can be injected without code changes.
// ============================================================================

const axios = require('axios');
const FormData = require('form-data');

/**
 * Resolve upload configuration from environment
 */
function getConfig() {
  const sanitize = (v) => {
    if (typeof v !== 'string') return v;
    const t = v.trim();
    // Strip leading/trailing quotes or backticks copied from docs/snippets
    return t.replace(/^['"`]+|['"`]+$/g, '');
  };
  const baseUrl = sanitize(process.env.REST_PDF_BASE_URL);
  const uploadPath = sanitize(process.env.REST_PDF_UPLOAD_PATH) || '/api/upload';
  const apiKey = sanitize(process.env.REST_PDF_API_KEY);
  // Optional: allow a single full upload URL via REST_PDF_API_URL
  const fullUrl = sanitize(process.env.REST_PDF_API_URL);
  // Optional: allow custom auth header and scheme for providers that don't use Bearer
  const authHeaderName = sanitize(process.env.REST_PDF_AUTH_HEADER) || 'Authorization';
  const configuredScheme = sanitize(process.env.REST_PDF_AUTH_SCHEME);
  const authScheme = configuredScheme && configuredScheme.length > 0
    ? configuredScheme
    : (authHeaderName === 'Authorization' ? 'Bearer' : '');
  return { baseUrl, uploadPath, apiKey, fullUrl, authHeaderName, authScheme };
}

/**
 * Upload a PDF from a Buffer to the RestPDF service.
 * Returns the hosted file URL if successful.
 *
 * @param {Buffer} buffer - PDF file buffer
 * @param {string} filename - Original filename (used for metadata)
 * @returns {Promise<string>} - URL of the uploaded PDF
 */
async function uploadPdfBuffer(buffer, filename) {
  const { baseUrl, uploadPath, apiKey, fullUrl, authHeaderName, authScheme } = getConfig();

  // Determine target URL: prefer explicit full URL if provided
  const url = fullUrl ? fullUrl : (baseUrl ? `${baseUrl}${uploadPath}` : null);
  if (!url) {
    throw new Error('REST_PDF_API_URL or REST_PDF_BASE_URL is not configured');
  }

  const form = new FormData();
  form.append('file', buffer, { filename: filename || 'document.pdf', contentType: 'application/pdf' });

  const headers = {
    ...form.getHeaders(),
  };

  if (apiKey) {
    // Support either Authorization: Bearer <key> (default) or custom header/scheme
    headers[authHeaderName] = authScheme ? `${authScheme} ${apiKey}` : apiKey;
    try {
      console.log(`[RestPDF] Using auth header '${authHeaderName}' with scheme '${authScheme || 'none'}' targeting`, url);
    } catch {}
  }

  // Some providers require explicit body length limits and accept header
  const axiosConfig = {
    headers: { ...headers, Accept: 'application/json' },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    validateStatus: (status) => status >= 200 && status < 500, // surface 4xx errors in response
  };

  const response = await axios.post(url, form, axiosConfig);

  // Try common response shapes to extract the URL
  const data = response?.data || {};
  // Debug: surface response shape to help diagnose mapping
  try {
    console.log('[RestPDF] Upload response:', JSON.stringify(data));
  } catch (e) {
    console.log('[RestPDF] Upload response (non-JSON)', typeof data);
  }

  // Handle explicit error responses from provider
  if (response.status >= 400) {
    const msg = typeof data?.error === 'string' ? data.error : 'Upload failed';
    throw new Error(`RestPDF error: ${msg}`);
  }
  if (typeof data?.error === 'string') {
    throw new Error(`RestPDF error: ${data.error}`);
  }
  const possibleKeys = ['url', 'fileUrl', 'location', 'path', 'secure_url', 'outputUrl'];
  let uploadedUrl = possibleKeys.map(k => data[k]).find(Boolean);

  // Helper: derive origin for building resource download URL
  const originFromUrl = (() => {
    try { return new URL(url).origin; } catch { return null; }
  })();

  const resourceBase = originFromUrl || (baseUrl ? new URL(baseUrl).origin : null);

  // If no direct URL, look for ids in typical pdfRest responses
  const pickFirstId = () => {
    // Top-level fields
    if (typeof data.outputId === 'string') return data.outputId;
    if (typeof data.id === 'string') return data.id;
    if (data?.resource?.id && typeof data.resource.id === 'string') return data.resource.id;
    if (typeof data.uuid === 'string') return data.uuid; // pdfRest often uses uuid

    // Arrays returned by Upload Files or other endpoints
    const arrays = [data.files, data.uploadedFiles, data.resources, data.outputs];
    for (const arr of arrays) {
      if (Array.isArray(arr) && arr.length) {
        const first = arr[0];
        if (typeof first === 'string') return first; // array of ids
        if (first?.outputId) return first.outputId;
        if (first?.id) return first.id;
        if (first?.resourceId) return first.resourceId;
        if (first?.uuid) return first.uuid;
        // Some responses include href like "/resource/<id>" or full url
        if (typeof first?.href === 'string') {
          const href = first.href;
          const match = href.match(/\/resource\/(\w[\w-]+)/);
          if (match?.[1]) return match[1];
          // If href is a full URL, try extracting the id
          try {
            const u = new URL(href, resourceBase || undefined);
            const segs = u.pathname.split('/');
            const idx = segs.indexOf('resource');
            if (idx >= 0 && segs[idx + 1]) return segs[idx + 1];
          } catch {}
        }
      }
    }
    return null;
  };

  // Some endpoints return outputUrl directly
  if (!uploadedUrl && data?.outputUrl && typeof data.outputUrl === 'string') {
    uploadedUrl = data.outputUrl;
  }

  // Build a downloadable URL from resource id when available
  if (!uploadedUrl) {
    const id = pickFirstId();
    if (id && resourceBase) {
      uploadedUrl = `${resourceBase}/resource/${id}?format=file`;
    }
  }

  if (!uploadedUrl) {
    throw new Error('Upload succeeded but no URL was returned by RestPDF');
  }

  return uploadedUrl;
}

module.exports = {
  uploadPdfBuffer,
};