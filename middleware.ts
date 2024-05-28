import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/api/webhooks/clerk']);

export default clerkMiddleware((auth, request) => {
  if(isProtectedRoute(request)){
    auth().protect()
  }
})

  // publicRoutes: ['/api/webhooks/clerk']
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};