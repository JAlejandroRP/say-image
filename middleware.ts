import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/api/webhooks/clerk']);

export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)){
    auth().protect()
  }
})

  // publicRoutes: ['/api/webhooks/clerk']
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};