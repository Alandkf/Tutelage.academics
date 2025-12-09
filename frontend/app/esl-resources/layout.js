import { Suspense } from "react";

export const metadata = {
  title: "ESL Resources | Tutelage",
  description: "Free ESL learning resources and materials",
};

export default function ESLResourcesLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
