"use client";

import { usePathname } from 'next/navigation';

export default function FooterWrapper({ children }) {
  const pathname = usePathname();
  
  const noFooterRoutes = [
    '/admin-dashboard',
  ];


  // Check if current pathname starts with any route in noFooterRoutes
  const shouldHideFooter = noFooterRoutes.some(route => 
    pathname.startsWith(route)
  );

  
  // Show navbar on specified routes or when not in a noNavbarRoute
  if (!shouldHideFooter) {
    return (
        <div >
            {children}
        </div>
 ) }
  
  // Otherwise, return null to hide the navbar
  return null;
}
