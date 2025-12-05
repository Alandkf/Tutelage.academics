import { Suspense } from "react";

export const metadata = {
  title: "Languages | Tutelage",
  description: "Overview of available languages and programs (English, Kurdish, Arabic).",
};

export default function LanguagesLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
