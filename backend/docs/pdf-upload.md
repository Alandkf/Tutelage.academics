# PDF Upload API

This guide explains how to upload PDF files when creating or updating Blogs, Skills (Reading/Writing/Speaking), and ESL Resources (EslAudio/EslVideo/Story).

The API accepts both multipart/form-data uploads and direct URL fields. When a file is uploaded, the backend forwards it to the RestPDF service and stores the returned URL in the resource.

## Endpoints

- `POST /api/blogs` and `PUT /api/blogs/:id`
- `POST /api/readings` and `PUT /api/readings/:id`
- `POST /api/writings` and `PUT /api/writings/:id`
- `POST /api/speakings` and `PUT /api/speakings/:id`
- `POST /api/esl-audios` and `PUT /api/esl-audios/:id`
- `POST /api/esl-videos` and `PUT /api/esl-videos/:id`
- `POST /api/stories` and `PUT /api/stories/:id`

Admin variants (e.g., `/api/blogs/admin`) also support the same upload fields.

## Payloads

Use `multipart/form-data` to upload files:

- `pdfFile`: PDF buffer to be uploaded
- `taskPdfFile`: Secondary PDF buffer (optional)
- Other text fields according to the model: e.g. `title`, `content`, `description`, `level`, `tags`, etc.

Alternatively, you can send `application/json` with direct URL fields:

- `pdf`: A direct URL pointing to an already hosted PDF
- `taskPdf`: A direct URL for the task-specific PDF

If both a file and a URL are provided for the same field, the file wins and is uploaded.

## Environment Configuration

Set the following variables in `backend/.env` to enable RestPDF integration. You can either provide a base URL + path, or a single full upload URL:

- `REST_PDF_BASE_URL` — Base URL of the RestPDF service
- `REST_PDF_UPLOAD_PATH` — Upload endpoint path (default: `/api/upload`)
- `REST_PDF_API_URL` — Full upload URL (alternative to base + path)
- `REST_PDF_API_KEY` — API key or token, if required
- `REST_PDF_AUTH_HEADER` — Auth header name (default: `Authorization`)
- `REST_PDF_AUTH_SCHEME` — Auth scheme prefix (default: `Bearer`; set empty if not needed)

Examples:

```
# Generic service using Authorization: Bearer
REST_PDF_BASE_URL=https://restpdf.example.com
REST_PDF_UPLOAD_PATH=/v1/files
REST_PDF_API_KEY=your_bearer_token

# pdfRest service (uses Api-Key header and full URL)
REST_PDF_API_URL=https://api.pdfrest.com/upload
REST_PDF_API_KEY=your_pdfrest_key
REST_PDF_AUTH_HEADER=Api-Key
REST_PDF_AUTH_SCHEME=

Note on regions and auth scheme:
- Use `https://api.pdfrest.com/upload` for US region and `https://eu-api.pdfrest.com/upload` for EU.
- For pdfRest, set `REST_PDF_AUTH_HEADER=Api-Key` and leave `REST_PDF_AUTH_SCHEME` blank. Do not prefix the key with `Bearer` when using `Api-Key`.
```

## Response

On success, the normal resource JSON is returned. If a file was uploaded, the `pdf` and/or `taskPdf` fields will contain the hosted URL from RestPDF.

On failure to upload to RestPDF, the API returns a `502` with `{ success: false, message: "PDF upload failed" }`.

### pdfRest specifics

- When using pdfRest, many processing endpoints return `outputUrl` and/or `outputId`. The backend will prefer `outputUrl` when present.
- The Upload Files endpoint typically returns resource IDs for uploaded files (e.g., `files[]` with `id`). In this case, the backend constructs a direct, downloadable URL using the service origin: `https://<region-host>/resource/<id>?format=file`.
- For EU region, the origin is `https://eu-api.pdfrest.com`; for US, `https://api.pdfrest.com`.

## Examples

### PowerShell (multipart/form-data)

```
$form = [System.Collections.Generic.Dictionary[string, string]]::new()
$form.Add('title', 'Sample Blog')
$form.Add('content', 'Body of the blog')

Invoke-WebRequest \
  -Uri 'http://localhost:3002/api/blogs' \
  -Method Post \
  -ContentType 'multipart/form-data' \
  -InFile 'C:\\path\\to\\worksheet.pdf' \
  -Form @{ pdfFile = Get-Item 'C:\\path\\to\\worksheet.pdf'; title = 'Sample Blog'; content = 'Body of the blog' }
```

### cURL (multipart/form-data)

```
curl -X POST 'http://localhost:3002/api/blogs' \
  -H 'Authorization: Bearer <token>' \
  -F 'title=Sample Blog' \
  -F 'content=Body of the blog' \
  -F 'pdfFile=@/path/to/worksheet.pdf;type=application/pdf'
```

### JSON (direct URLs)

```
curl -X POST 'http://localhost:3002/api/readings' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
    "title": "Reading Passage",
    "content": "...",
    "pdf": "https://cdn.example.com/files/passage.pdf"
  }'
```

## Frontend Integration (Next.js)

Use `FormData` from client components and include credentials so the session cookie is sent.

```tsx
'use client';
const form = new FormData();
form.append('title', 'Sample Blog');
form.append('content', 'Body');
form.append('pdfFile', file, file.name);

await fetch('http://localhost:3001/api/blogs', {
  method: 'POST',
  credentials: 'include',
  body: form,
});
```

Do not set `Content-Type` manually for `FormData`. For pdfRest, the backend uses `Api-Key` and will construct a direct downloadable URL like `https://api.pdfrest.com/resource/<id>?format=file`.

## Notes

- File size limit is 25MB per PDF.
- Only `application/pdf` is accepted for `pdfFile` and `taskPdfFile`.
- If RestPDF credentials or base URL are missing, file uploads will fail. Provide the service details to enable uploads.