# LEO Institute Showcase: Implementation Plan

> **Read this whole file before you start.** Work through the phases in order and check each acceptance list before you move on.
> Frontend only. Next.js 15 (App Router), React 19, Tailwind v4, framer-motion, lucide-react, shadcn/ui in `frontend/components/ui`.

## 1. Goal and context

**LEO Institute** (پەیمانگای لیۆ) is a language institute in the Kurdistan Region of Iraq. Its Instagram is @leo__institute (about 44.8K followers).
We are building a **pitch / showcase website** for them. It shows what their site would look like, and above all it shows **"LEO AI"**: our existing Tutelage AI, presented as if it were theirs.
If they like it, we will build the real thing later. So this should be **simple, polished and convincing, not deep**. There is no backend, no auth and no real data.

**Requirements from the owner:**
- The site is bilingual: **Kurdish (Sorani, RTL)** and **English (LTR)**, with a toggle. Default to Kurdish.
- Keep it simple. A single landing page plus at most one extra page (`/ai`).
- They have no real courses yet. Use **sample content**, based on what their Instagram promotes (listed below).

## 2. Brand assets

- **Logo:** `frontend/public/leo/leo-logo.png` (200×200 PNG, **white background, not transparent**). It is a shield with a "house" roof, the words "LEO INSTITUTE", three stars, and the tagline **"LEARN · ENJOY · STAY"**.
  - Because the background is white, show it on white or light surfaces, or inside a white rounded badge on dark surfaces. Do not put it straight onto navy.
- **Colors** (approximated from the logo; open the PNG and adjust the hex values by eye if they are off):
  - Navy (primary): `#1E3A6E`, with a darker shade `#142A52`
  - Red (accent): `#C8202F`
  - White `#FFFFFF`, light surface `#F4F6FA`
  - Their Instagram posters also use **yellow highlight bars** (≈ `#FFD43B`). Use this sparingly, for example for "free / offer" badges.
- **Feel:** academic, trustworthy and bold, like their posters. Use navy blocks, red accents and generous whitespace.
- **Fonts** (via `next/font/google`):
  - English: `Inter` (or `Poppins` for headings)
  - Kurdish: **`Noto Sans Arabic`**. It supports Sorani letters (ڕ ڵ ێ ۆ ە ھ). Apply it when `lang="ckb"`.

## 3. Real facts we can use (from the public Instagram)

- Name: LEO Institute / پەیمانگای لیۆ
- Bio theme: courses in language, development and empowerment (خولی زمانەوانی - گەشەپێدان - بەھێزکردن)
- Phones: **0770 736 2000** and **0750 886 2786**
- Instagram: https://www.instagram.com/leo__institute/
- Facebook: https://www.facebook.com/share/1A5FcmPKNE/
- Threads: https://www.threads.net/@leo__institute
- What they promote: English courses (online and in-person), Arabic courses, Visa A1 prep (German A1 for visas), free online lessons and a placement test, and winter offers.
- Location: Kurdistan Region of Iraq. The city is **unknown**, so do not invent an address. Show "Kurdistan Region" only.

## 4. Strategy: build beside the Tutelage app, don't rewrite it

The repo is the full Tutelage app: many routes, an admin dashboard, and a backend dependency. **Do not delete or refactor Tutelage code.** Instead:

1. Build all LEO UI in **new files** under `components/leo/` and `lib/leo/`.
2. Replace `app/page.js` and `app/layout.js` so they render only the LEO experience.
3. **Redirect every other route to `/`** so a curious visitor never sees Tutelage branding.

This keeps the diff small and reviewable, and `main` stays untouched.

## 5. Phases

### Phase 0: Branch

```bash
git checkout main && git pull
git checkout -b leo-institute
```
- `LEO_PLAN.md` (this file) and `frontend/public/leo/leo-logo.png` are untracked on `main`. They will carry over to the branch, so commit them in the first commit.
- Create `frontend/.env.local` if it doesn't exist (it is gitignored). Add an optional `NEXT_PUBLIC_LEO_AI_URL=` (see Phase 4).

### Phase 1: Shell (layout, language, theme)

**`lib/leo/content.js`** holds all copy in one object: `export const content = { en: {...}, ku: {...} }`. Both languages must have the same keys. **Do not use the existing `i18n.js`**: it is 1,100 lines of Tutelage copy and stores its state under `tutelage-language`.

**`components/leo/LanguageProvider.jsx`** (`'use client'`):
- The context exposes `{ lang, setLang, t, dir }`. `t` returns `content[lang]`.
- Default `'ku'`. Persist the choice under `localStorage` key `leo-language`, and wrap the access in try/catch.
- Whenever `lang` changes, set `document.documentElement.lang` (`ckb` / `en`) and `document.documentElement.dir` (`rtl` / `ltr`).
- To avoid a hydration flash, render the server HTML with `lang="ckb" dir="rtl"` (the default). Read localStorage only in `useEffect`.

**`app/layout.js`**:
- Rewrite it. Remove: Google Analytics (it is **Tutelage's** GA ID `G-RM0EWLJGN8`; demo traffic must not go there), `AuthProvider`, `RefreshTokenProvider`, the Tutelage `Navbar`/`Footer` and their wrappers.
- Keep `Toaster` (sonner) and `globals.css`.
- `<html lang="ckb" dir="rtl">`. Load both fonts as CSS variables. Set the font family by `:lang(ckb)` / `:lang(en)` in CSS.
- Metadata: title `LEO Institute | پەیمانگای لیۆ`, a short bilingual description, and the favicon `/leo/leo-logo.png`.
- Wrap the page in `LanguageProvider`, with `<LeoNavbar/>`, `{children}` and `<LeoFooter/>`.

**`app/globals.css`**: replace the `:root` color tokens with the LEO palette (`--primary` navy, `--accent` red, `--ring` navy, and so on). Keep the `@theme inline` block, so shadcn components re-skin automatically. **Remove `.dark` handling**, because the LEO site is light-only. Recolor the scrollbar (it is yellow now) to navy.

**RTL rules for every component you write:**
- Use logical utilities only: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`. Never `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`, `text-left` or `text-right`.
- Directional icons such as arrows and chevrons need `rtl:rotate-180`.
- Phone numbers, emails and English brand names inside Kurdish text: wrap them in `<span dir="ltr">`.

**`next.config.mjs`**: add `redirects()` that send every non-LEO route to `/` (non-permanent): `/about-us`, `/admin-dashboard/:path*`, `/contact`, `/courses/:path*`, `/esl-resources/:path*`, `/languages/:path*`, `/levels/:path*`, `/search`, `/signin`, `/skills/:path*`, `/tutelage-tests/:path*`. **Do not** redirect `/ai`.
- `middleware.js` handles admin auth. Leave it, because the redirects make it irrelevant. Check that it doesn't interfere.

**Acceptance:**
- `npm run dev` boots with no backend running.
- `/` loads, and `/courses` redirects to `/`.
- Toggling the language flips the layout direction and the font, and the choice survives a reload.
- There are no hydration warnings in the console.

### Phase 2: Navbar and footer

**`components/leo/LeoNavbar.jsx`**: sticky and white, with a subtle shadow on scroll.
- Logo (40px) plus "LEO Institute" / "پەیمانگای لیۆ".
- Anchor links: Home, About, Courses, **LEO AI** (highlighted with a small red "New" badge), Contact.
- A language toggle button that shows the *other* language ("English" / "کوردی"). Don't use flag images.
- A "Call us" button (`tel:07707362000`).
- Mobile: a hamburger menu that opens a sheet or dropdown, using `components/ui/dialog` or a simple state toggle.

**`components/leo/LeoFooter.jsx`**: navy background.
- The logo inside a white rounded badge, plus the tagline "Learn · Enjoy · Stay".
- Quick links, both phones, and Instagram, Facebook and Threads icons (lucide `Instagram`, `Facebook`, plus an `AtSign` for Threads).
- `© {year} LEO Institute`.
- A small, muted line: "Website concept by Tutelage". This credits us, which matters because this is a pitch.

### Phase 3: Landing page sections (`app/page.js` → `components/leo/*`)

`app/page.js` becomes a plain composition of the sections below. Remove the backend fetch. Each section is one component and has an `id` for anchor navigation. Use framer-motion `whileInView` fade-ups (once, subtle), the same idiom as `components/landing/TutelageAi.jsx`.

1. **Hero** (`id="home"`)
   - Navy background with a soft diagonal red accent shape.
   - Headline (KU and EN), for example "Learn languages with confidence: now with your own AI tutor" / «زمان فێربە بە متمانەوە: ئێستا لەگەڵ مامۆستای زیرەکی دەستکرد».
   - Subline and two CTAs: **"Try LEO AI"** (to `#ai`) and **"Our courses"** (to `#courses`).
   - On the opposite side, a stylized "AI chat card" mock (see section 4) as the visual. Use no stock photo.
2. **Stats strip**
   - "44K+ followers", "English · Arabic · German A1", "Online & in-person", "Free placement test".
   - Use `react-countup` (already installed) for the number.
3. **About** (`id="about"`)
   - Short copy about the institute: language, development, empowerment.
   - Three value cards that map to the tagline: **Learn / Enjoy / Stay**.
4. **LEO AI showcase** (`id="ai"`). **This is the most important section; spend the most effort here.**
   - Title: "Meet LEO AI" / «ناسینی LEO AI».
   - **An interactive scripted demo**, client-side only, with no API calls. Tabs (`components/ui/tabs`) for 3 skills:
     - **Writing feedback:** the user picks or pastes a sample sentence, then sees corrected text with highlighted fixes, a CEFR estimate (e.g. "B1") and 2–3 tips.
     - **Speaking practice:** a mock conversation that shows a prompt, a "recorded" answer transcript, and pronunciation and fluency scores as progress bars (`components/ui/progress`).
     - **Placement test:** 3 quick multiple-choice questions, then a result card ("Estimated level: A2, recommended course: General English").
   - Use canned responses only. Reveal them with a short typing or loading animation (600–1200 ms) so it feels live.
   - Add 4 feature bullets beside or below the demo, reworded from `TutelageAi.jsx`: instant feedback, available 24/7, tracks progress, built for Kurdish learners (explanations in Kurdish).
   - CTA: "Request full access". If `NEXT_PUBLIC_LEO_AI_URL` is set, link to it (`target="_blank"`). Otherwise scroll to `#contact`.
   - Do **not** mention "Tutelage" in this section. It is presented as LEO's.
5. **Courses** (`id="courses"`)
   - 4–6 cards of **sample** courses: General English (A1–C1), English Online, Kids & Teens English, Arabic, German A1 (visa), IELTS prep.
   - Each card has an icon, a level badge, "Online / In-person" chips and a "Register interest" button that goes to `#contact`.
   - **No prices.**
   - Add a small note under the grid: "Course list is illustrative" / «لیستی خولەکان نموونەیە». Put it in the copy so the owner can remove it later.
6. **Why LEO / Testimonials-lite**
   - 3 short quote cards with first names only. Mark them as samples in a code comment so they are easy to replace.
7. **Contact** (`id="contact"`)
   - Phone cards (tap to call), social links, and "Kurdistan Region, Iraq".
   - A simple form (name, phone, course select) built with the existing `react-hook-form` + `zod`. On submit, **show a sonner toast** saying "Thanks, we'll call you". **Send nothing anywhere.**
   - Add a code comment saying it is demo-only.

### Phase 4: `/ai` page (optional; do it if Phase 3 went smoothly)

`app/ai/page.jsx` is a full-page version of the LEO AI demo. Reuse the same component in a larger layout, plus a short "How it works" section in 3 steps.

### Phase 5: Polish and QA

- Check every section in **both languages** at 375px, 768px and 1280px widths. Nothing should be clipped, no horizontal scroll, and no mirrored text.
- Run `npm run build`. It must pass. Fix any lint or type errors in **new** files. Don't touch unrelated Tutelage files.
- Lighthouse quick pass: images have `alt`, buttons have labels, and color contrast passes. Check white on navy and red on white.
- Run `grep -ri "tutelage" frontend/components/leo frontend/lib/leo frontend/app/page.js frontend/app/layout.js`. The only hit should be the footer credit line.

## 6. Kurdish copy guidelines

- Write natural **Sorani** in Arabic script, not Kurmanji or Latin script. Use the proper Sorani letters: ە ێ ۆ ڕ ڵ ڤ.
- Keep it short and warm, like their Instagram posters.
- **Flag every Kurdish string for owner review.** Add a `// TODO(ku-review)` comment at the top of the `ku` object in `content.js`. The owner is a native speaker and will proofread it.

## 7. Out of scope (don't do)

- Backend changes, real AI calls, auth, database or admin.
- Deleting Tutelage routes or components. The redirects handle visibility.
- Dark mode, blog or resources pages, prices, or a real address.
- Upgrading Next.js or other dependencies.

## 8. Commits and handoff

- Use small commits per phase on `leo-institute`, for example `leo: app shell + language provider`, `leo: navbar and footer`, `leo: AI showcase demo`.
- Don't push or open a PR unless the owner asks.
- At the end, report:
  - what was built and how to run it (`cd frontend && npm run dev`, then http://localhost:3000);
  - anything unfinished;
  - the list of placeholder or sample content the owner must replace or confirm: Kurdish copy, courses, testimonials, `NEXT_PUBLIC_LEO_AI_URL`, and the city/address.
