import { jwtVerify } from "jose";
import { NextResponse } from "next/server"


export default async function middleware(req) {
  // Get the token from the cookies
  const token = req.cookies.get('token')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  
  const { pathname } = req.nextUrl;
  
  // Define routes configuration
  const authRoutes = ['/signin']; // Routes that should redirect to home when logged in
  // Any route that starts with /admin-dashboard is private
  const isPrivateRoute = pathname.startsWith('/admin-dashboard');
  
  // Check if user is authenticated
  let isAuthenticated = false;
  let userRole = null;
  
  if (token && refreshToken) {
    try {
      // Encode the secret key
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      
      // Verify the token
      const { payload } = await jwtVerify(token, secret);
      if (payload) {
        isAuthenticated = true;
        userRole = payload.role;
      }
    } catch (err) {
      console.log("Token check failed:", err.code || err.name);
      // Token is invalid, but we'll handle that based on route requirements
    }
  }
  
  // RULE 1: If user is authenticated and tries to access an auth route (e.g., signin)
  // redirect them to the home page
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  // RULE 2: If user is not authenticated and tries to access a private route
  // redirect them to the signin page
  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Alias common path /login -> /signin
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  
  // Additional role-based access control for admin-dashboard
  if (isAuthenticated && pathname.startsWith('/admin-dashboard')) {
    // Specific check for quiz route: only ADMIN can access
    if (pathname === '/admin-dashboard/quiz' || pathname === '/admin-dashboard/users' || pathname === '/admin-dashboard/approvals') {
      if (userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else {
      // For other admin-dashboard routes: only ADMIN and MAIN_MANAGER can access
      const allowedRoles = ['ADMIN', 'MAIN_MANAGER'];
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }
  
  // All other routes are public
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
