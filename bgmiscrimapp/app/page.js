 import HomePage from "./home/page";

export async function getStaticProps(){
 return{
  revalidate: 60,
 }
}

 export default function Page() {
  return <HomePage />;
 }
