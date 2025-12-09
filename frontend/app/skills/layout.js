import { Suspense } from "react";

export const metadata = {
  title: "Skills | Tutelage",
  description: "Master English reading, writing, listening, and speaking skills with Tutelage's comprehensive skill-building resources. Practice independently with level-based materials from A1 beginner to C1 advanced. Free exercises, guided activities, and structured practice to improve your English language proficiency at your own pace.",
};

export default function SkillsLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
