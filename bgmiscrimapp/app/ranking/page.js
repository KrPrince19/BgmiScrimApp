"use client"
import React from 'react'
import { rankdata } from '../admin/admin'
import { useState } from "react";


const page = () => {
    const [selected, setSelected] = useState("one");
  
  return (
    <>
    <div className='mt-2'>

    </div>
    <div className='ranking overflow-auto scrollbar-hide h-[100vh]'>
      <div>         
<div className=" w-[96%] h-[70vh]  p-6 bg-gray-300 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">BMPS 2024</h5>

<div className="topplayerimg flex gap-3">
  <div className="firstImg">
    <img className='w-60 h-60' src="/mvpimage/mvp.png" alt="#1" />
  </div>
  <div className="secondImg">
    <img className='w-60 h-60'  src="/mvpimage/scout.png" alt="#2" />
  </div>
  <div className="thirdImg">
    <img className='w-60 h-60' src="/mvpimage/dynamo.png" alt="#3" />
  </div>
</div>

<div className="data flex justify-around ">
  <div className='flex flex-col'> 
    <h1 className='rank text-red-500 text-3xl font-bold'>#1</h1>
    <h1 className='name text-2xl font-bold text-black'>Jonathan</h1>
    <h1 className='point font-bold text-black'><span>Point:-</span>220</h1>
    <h1 className='kill font-bold text-black'>Kill:-30</h1>
  </div>
  <div className='flex flex-col'> 
    <h1 className='rank text-yellow-600 text-3xl font-bold'>#2</h1>
    <h1 className='name text-2xl font-bold text-black'>scout</h1>
    <h1 className='point font-bold text-black'>Point:-210</h1>
    <h1 className='kill font-bold text-black'>Kill:-24</h1>
  </div>
  <div className='flex flex-col'> 
    <h1 className='rank text-blue-600 text-3xl font-bold'>#3</h1>
    <h1 className='name text-2xl font-bold text-black'>dynamo</h1>
    <h1 className='point font-bold text-black'>Point:-198</h1>
    <h1 className='kill font-bold text-black'>Kill:-15</h1>
  </div>
</div>
</div>


    <div className='playerRank100  h-[100vh]'>
    <div className=" w-[96%] my-2">
    <div className="flex justify-around  gap-2 bg-gray-800 rounded-t-lg px-4 py-3 uppercase text-gray-400 text-xs font-semibold select-none">
      <div className="col-span-2 text-left">RANK</div>
      <div className="text-center">PLAYER NAME</div>
      <div className="text-center">TEAM NAME</div>
      <div className="text-center">POINT</div>
      <div className="text-center">Finisher</div>
    </div>
  </div>

    <div className=" rounded-t-lg w-[96%]   ">
        {rankdata.map((playerrankdata, idx) => (
    <div className=" flex justify-around bg-gray-900 gap-1 mt-1 p-6 text-center ml-auto  rounded-t-2xl border-r-1 border-l-1 border-yellow-200 ">
      <div className="text-yellow-400 text-3xl font-bold text-center">
            <div ># {playerrankdata.rank}</div>
      </div>
      <div>
            <div className="text-white text-2xl font-semibold">{playerrankdata.playerName.toUpperCase()}</div>
      </div>
      <div>
        <div className="text-green-400 text-2xl font-semibold">{playerrankdata.teamName.toUpperCase()}</div>
      </div>
      <div>
        <div className="text-green-400 text-2xl font-semibold">97</div>
      </div>
      <div>
        <div className="text-green-400 text-2xl font-semibold">96</div>
      </div>
    </div>
    ))}
  </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default page
