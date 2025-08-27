import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // 👇 Allow public access to these routes
  publicRoutes: ['/admin/login', '/', '/about'], // Add more public routes as needed
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
