"use client";

import { usePathname } from 'next/navigation';

export default function LanguageWrapper({ children }) {
  const pathname = usePathname();
  
  const LanguageRoutes = [
    '/languages/kurdish',
    '/languages/arabic',
  ];


  // Check if current pathname starts with any route in noLanguageRoutes
  const shouldShowLanguage = LanguageRoutes.some(route => 
    pathname.startsWith(route)
  );

  
  // Show navbar on specified routes or when not in a noNavbarRoute
  if (shouldShowLanguage) {
    return (
        <div className={`relative z-50`}>
            {children}
        </div>
 ) }
  
  // Otherwise, return null to hide the navbar
  return null;
}
