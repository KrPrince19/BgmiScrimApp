// import React from 'react'
// import { currentUser } from '@clerk/nextjs/server'
// import { UserButton } from '@clerk/nextjs'
 
// const page = async () => {
//    const user = await currentUser()
   
//   return (
//    <div className=" w-[70vw] min-h-screen flex items-start justify-center -ml-10 mt-20 py-8">
//   <div className="bg-white text-black shadow-lg rounded-lg w-full max-w-sm sm:max-w-md lg:w-90  flex flex-col items-center">
//     <UserButton />
//     <p className="text-center mb-4">Hi, {user?.username} — Welcome to FragZone</p>
//     <p className="text-center mb-4">{user?.emailAddresses[0].emailAddress}</p>
    


//   <h1 className='text-red-300'>
//   {process.env.NEXT_PUBLIC_MATCH_PASSWORD === "" ? (
//     <span>Password will show before 15 minutes of match time.</span>
//   ) : (
//     <span>Password Is:-{process.env.NEXT_PUBLIC_MATCH_PASSWORD}</span>
//   )}
// </h1>

// </div>
//   </div>

//   )
// }

// export default page

import { currentUser } from "@clerk/nextjs/server";
import UserDashboard from "./UserDashboard";

export default async function Page() {
  const user = await currentUser();

  // Extract user details
  const name = user?.username ?? "Guest";
  const userEmail = user?.emailAddresses?.[0]?.emailAddress ?? "";

  // Pass as separate props
  return <UserDashboard userEmail={userEmail} name={name} />;
}

