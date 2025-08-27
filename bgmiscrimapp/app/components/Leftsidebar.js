"use client"
import React from 'react'
import { useState ,useEffect} from "react";
import Image from 'next/image';
import Link from 'next/link';
// import { mvpplayer } from '../admin/admin';
import { FaHome } from "react-icons/fa";
import { PiRanking} from "react-icons/pi";
import { GoTrophy } from "react-icons/go";
import { GiCrossedSwords } from "react-icons/gi";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { SignedIn,SignedOut} from '@clerk/nextjs';


const Leftsidebar = () => {
    const [selected, setSelected] = useState("one");
     const [mvpplayer, setmvpplayers] = useState([]);
      const [loading, setLoading] = useState(true);



       useEffect(() => {
          const fetchTournaments = async () => {
            try {
              const res = await fetch('http://localhost:5000/mvpplayer');
              if (!res.ok) throw new Error(`Server responded with ${res.status}`);
              const data = await res.json();
              setmvpplayers(data);
            } catch (err) {
              console.error('❌ Error fetching tournaments:', err);
            } finally {
              setLoading(false);
            }
          };
      
          fetchTournaments();
        }, []);

  
  return (
    <>
    
    <div className='Sidebar flex justify-between' >
        <div className='left  overscroll-y-contain  w-[15%] h-[100%]  text-white text-2xl font-bold flex'>
          <div className='left0fleft'>

      <div className="home mx-10 mt-10 ">
        <div className="home-logo  pb-3"><FaHome /></div>
        <div  onClick={() => setSelected("one")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "one" ? "text-yellow-500 underline" : "text-white"
            }`}>
           <Link href="/home" className="hover:underline">
      HOME
    </Link>
            </div>
      </div>
      <div className="home mx-10 my-5">
        <div className="home-logo pb-3"><GoTrophy /></div>
        <div onClick={() => setSelected("two")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "two" ? "text-yellow-500 underline" : "text-white"
            }`}>
             <Link href="/turnament" className="hover:underline">TURNAMENTS</Link> 
            </div>
      </div>
      <div className="home mx-10 my-6">
        <div className="home-logo pb-3"><PiRanking /></div>
        <div onClick={() => setSelected("three")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "three" ? "text-yellow-500 underline" : "text-white"
            }`}>
             <Link href="/ranking" className="hover:underline">RANKING</Link></div>
      </div>
    <div className="home mx-10 my-6">
        <div className="home-logo pb-3"><GiCrossedSwords /></div>
        <div onClick={() => setSelected("four")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "four" ? "text-yellow-500 underline" : "text-white"
            }`}>
            <Link href="/scrim" className="hover:underline">SCRIMS</Link></div>
      </div>
     
    <SignedOut>
    <button type="button" className=" mx-4 my-4 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
       <Link href="/admin/login">Sign in as Admin</Link>
      </button>
      </SignedOut>

      <SignedIn>
       <Link href='/adminpanel'>Admin Dashboard</Link>
      </SignedIn>


    <div className="social-media  flex gap-2 mx-4 my-5">
        <div className=''>
            Join us:-
        </div>
        <div className='mt-2'>
            <Link href="/"><FaYoutube/></Link>
        </div>
        <div className='mt-2'>
            <Link href="/" ><FaInstagram/></Link>
        </div>
    </div>
     </div>
     <div className='rightOFleft'>
   
    <div className=' right w-0.5 h-[90vh] bg-gray-700 text-black'>.</div>
    </div>
    </div>
    <div className=' right w-0.5 h-[90vh] bg-gray-700 text-black ml-[63%]'>.</div>

 {loading ? (
        <p className="text-white">Loading tournaments...</p>
      ) : ( 
     <div  className='right w-64 mr-2 mt-4 h-[90vh] '>
        {mvpplayer.map((player, idx) => (
       <div key={idx}
        className="card ">
  <img  src={player.imgSrc} className="card-img-top h-45" alt="..."/>
  <div className="card-body bg-cyan-50 text-gray-500 border-x border-x-gray-300 border-b border-b-gray-300">
       <h1 className='text-2xl font-bold text-center bg-cyan-300 text-black'>MVP</h1>
      <div className='kill flex-col flex '>
        <span className='clan font-bold text-2xl mx-4 '>{player.teamname.toUpperCase()}</span>
        <span className='player font-bold text-2xl mx-4'>{player.name.toUpperCase()}</span>
        <span className='kill  font-bold text-2xl mx-4 '>Kill:- {player.kill}</span>
      </div>
  </div>
</div>
          ))}
     
      
    </div>
      )}
   
        </div>
</>
  )
}
export default Leftsidebar
