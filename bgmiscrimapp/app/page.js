// app/page.js
import HomePage from './home/page';

// Revalidate page every 60 seconds (like getStaticProps revalidate)
export const revalidate = 60;

export default function Page() {
  return <HomePage />;
}
