import { jwtVerify } from "jose";
import { NextResponse } from "next/server"


export default async function middleware(req) {
  // Get the token from the cookies
  const token = req.cookies.get('token')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  
  const { pathname } = req.nextUrl;
  
  // Define routes configuration
  const authRoutes = ['/signin']; // Routes that should redirect to home when logged in
  const privateRoutes = ['/admin-dashboard']; // Routes that require authentication
  
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
  if (!isAuthenticated && privateRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  // Additional role-based access control for admin-dashboard
  if (isAuthenticated && pathname === '/admin-dashboard') {
    // Only ADMIN and MAIN_MANAGER roles can access admin-dashboard
    const allowedRoles = ['ADMIN', 'MAIN_MANAGER'];
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/', req.url));
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
     