This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Uploading PDFs to the Backend

The backend exposes endpoints (e.g., `POST /api/blogs`, `POST /api/readings`, `POST /api/writings`, `POST /api/speakings`, `POST /api/stories`, `POST /api/esl-audios`, `POST /api/esl-videos`) that accept `multipart/form-data` with:

- `pdfFile`: main PDF file
- `taskPdfFile`: optional secondary PDF file
- plus any text fields required by the resource (`title`, `content`, etc.)

Important:
- Do not manually set the `Content-Type` header for `FormData`; the browser will set the boundary.
- Include credentials so the session cookie is sent: `credentials: 'include'` (or `axios` with `withCredentials: true`).

Example client component (Next.js App Router):

```tsx
'use client';
import { useState } from 'react';

export default function BlogPdfUploadForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) {
      setStatus('Please select a PDF file.');
      return;
    }
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('pdfFile', pdfFile, pdfFile.name);

    const res = await fetch('http://localhost:3001/api/blogs', {
      method: 'POST',
      credentials: 'include', // send session cookie
      body: form,
    });
    const data = await res.json();
    if (res.ok && data?.success) {
      setStatus(`Created. PDF URL: ${data.data?.pdf ?? 'n/a'}`);
    } else {
      setStatus(data?.error || data?.message || 'Upload failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Create Blog with PDF</button>
      <div>{status}</div>
    </form>
  );
}
```

Axios variant:

```ts
import axios from 'axios';

const form = new FormData();
form.append('title', 'Sample Blog');
form.append('content', 'Body');
form.append('pdfFile', file, file.name);

const { data } = await axios.post('http://localhost:3001/api/blogs', form, {
  withCredentials: true,
  headers: { /* do not set Content-Type manually */ },
});
```

Direct URL (no file upload):

```ts
await fetch('http://localhost:3001/api/readings', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Passage', content: '...', pdf: 'https://cdn.example.com/p.pdf' }),
});
```

Notes:
- Backend CORS is configured for `http://localhost:3000` with `credentials: true`.
- Responses on success include `data.pdf` (and/or `data.taskPdf`) with a hosted URL.
- On RestPDF upload failure you’ll see `502` with `{ success: false, message: 'PDF upload failed' }`.

## CompactAudioPlayer (YouTube audio-only)

- Use `CompactAudioPlayer` to stream audio-only from a YouTube link without any video or branding.
- The component resolves the audio stream via backend endpoint `GET /api/youtube-audio/resolve?url=...`.
- Props:
  - `src`: optional direct audio URL (mp3/opus/etc.).
  - `youtubeUrl`: a standard YouTube URL. If provided, audio-only is auto-resolved on mount.
  - `className`: optional additional class names.
- Example:

```jsx
import CompactAudioPlayer from '@/components/players/CompactAudioPlayer'

export default function Example({ url }) {
  return (
    <CompactAudioPlayer src={url} youtubeUrl={url} />
  )
}
```

- In admin forms, paste either a direct audio URL or any standard YouTube URL into the “Audio URL” field. Pages using the player will automatically resolve and stream the audio track only.
