import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
 
const page = async () => {
   const user = await currentUser()
  return (
    <div  className='text-white h-full flex flex-col items-center justify-center'>
      Hi.  {user?.username} Welcome to FragZone
    </div>
  )
}

export default page
