"use client"
import Image from "next/image";
import React from 'react'
import { useState,useEffect } from "react";


const Page = () => {
   const [playerrank, setPlayerrank] = useState([]);
   const [topPlayerrank, setTopPlayerrank] = useState([]);
       const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);
       

   useEffect(() => {
         const fetchPlayer = async () => {
           try {
             const res = await  fetch('https://bgmibackend.onrender.com/rank');
             if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
             const data = await res.json();
            setPlayerrank(data);
           } catch (err) {
             console.error(err);
             setError("❌ Failed to fetch player.");
           } finally {
             setLoading(false);
           }
         };
     
         fetchPlayer();
       }, []);

       //fetch toprank player
   useEffect(() => {
         const fetchPlayer = async () => {
           try {
             const res = await fetch(`http://localhost:5000/topplayer`);
             if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
             const data = await res.json();
            setTopPlayerrank(data);
           } catch (err) {
             console.error(err);
             setError("❌ Failed to fetch player.");
           } finally {
             setLoading(false);
           }
         };
     
         fetchPlayer();
       }, []);

  
  return (
    <>        
     <div className='mt-16  -ml-4'>

   <div className="toperdata  sm:flex left-0 gap-2 -ml-[37px] sm:-ml-0 w-[70vw] sm:w-[92%] h-[100%] sm:h-[74vh] rounded-2xl bg-gray-300">
        {topPlayerrank.map((topplayer,idx) => (
    <div key={idx} className='ml-1  mt-4'>
      <Image className="w-64 h-60 rounded-2xl" src={topplayer.imgSrc} alt="" />
      <div className='flex  sm:ml-2 flex-col justify-center text-center  mt-4'>
        <h1 className='text-yellow-400 text-2xl font-bold p-1'>#{topplayer.rank}</h1>
        <h2 className='text-black text-3xl font-bold p-1'>{topplayer.playerName.toUpperCase()}</h2>
        <h2 className='text-black font-bold text-2xl p-1 '>KILL:-{topplayer.kill}</h2>
        <h2 className='text-black font-bold text-2xl p-1'>POINT:-{topplayer.point}</h2>
      </div>
    </div>
        ))}
   </div>

 
{loading ? (
        <p className="text-white">Loading tournaments...</p>
      ) : (
    <div className=" rounded-t-lg w-[92%]  my-4 ">
        {playerrank.map((playerrankdata,idx) => (
    <div
           key={idx} className=" sm:flex justify-around bg-gray-900 gap-1 mt-2 p-6 text-center ml-auto  rounded-t-2xl border-r-1 border-l-1 border-yellow-200 ">
      <div className="text-yellow-400 text-3xl font-bold text-center">
            <div >#{playerrankdata.rank}</div>
      </div>
      <div>
            <div className="text-white text-2xl font-semibold">{playerrankdata.playerName.toUpperCase()}</div>
      </div>
      <div>
        <div className="text-green-400 text-2xl font-semibold">{playerrankdata.teamName.toUpperCase()}</div>
      </div>
      <div>
        <div className="text-green-400 text-2xl font-semibold">{playerrankdata.point}</div>
      </div>
      <div>
        <div className="text-green-400 text-2xl font-semibold">{playerrankdata.kill}</div>
      </div>
    </div>
    ))}
  </div>

)} 


</div>
    </>
  )
}

export default page
