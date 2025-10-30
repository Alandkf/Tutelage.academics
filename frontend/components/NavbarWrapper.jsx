"use client";

import { usePathname } from 'next/navigation';

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  
  const noNavbarRoutes = [
    '/admin-dashboard',
  ];

  const absoluteRoutes = [
    '/',
    '/skills',
    '/courses',
    '/esl-resources',
    '/levels',
    '/tutelagetests',
    '/about-us',
    '/contact',
  ]

  // Check if current pathname starts with any route in noNavbarRoutes
  const shouldHideNavbar = noNavbarRoutes.some(route => 
    pathname.startsWith(route)
  );

  const shouldMakeNavbarAbsolute = absoluteRoutes.some(route => {
    if (route === '/') {
      return pathname === '/'; 
    }
    return pathname === route;
  });
  
  // Show navbar on specified routes or when not in a noNavbarRoute
  if (!shouldHideNavbar) {
    return (
        <div className={`${shouldMakeNavbarAbsolute ? 'absolute top-0 left-0 w-full z-50' : 'relative z-50'} `}>
            {children}
        </div>
 ) }
  
  // Otherwise, return null to hide the navbar
  return null;
}
