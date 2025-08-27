import Link from 'next/link'
import React from 'react'

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className="Navbar  w-full h-15 bg-gray-900 text-white text-2xl flex justify-between">
        <div className="left flex justify-around w-[25%] m-4">
            <div>FragZone 

               </div>
            <div>Bgmi</div>
        </div>
        <div className="right flex justify-around w-[50%] m-4 text-white">
            <div>
                <input className="pl-4 border-1 border-gray-600 rounded-xl w-[300px] placeholder-gray-50 " type="text" placeholder='search...' />
            </div>
            <div>
                
    <SignedOut>           
<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
<SignInButton/>
</span>
</button>


<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
<SignUpButton/>
</span>
</button>
{/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
sign in as admin
</span>
</button> */}
</SignedOut> 
<SignedIn>
    <div className='flex gap-2'>
         <Link href="/profile" className="hover:underline">
      Profile
    </Link>
    <UserButton/>
    </div>
   
</SignedIn>

       
                    
            </div>
        </div>
        
    </div>



  )
}

export default Navbar
