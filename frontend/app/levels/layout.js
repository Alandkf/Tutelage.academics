import { Suspense } from "react";

export const metadata = {
  title: "Levels | Tutelage",
  description: "English proficiency levels explained",
};

export default function LevelsLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
