"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
// import HomePage from "./home/page";

import { FaHome } from "react-icons/fa";
import { PiRanking } from "react-icons/pi";
import { GoTrophy } from "react-icons/go";
import { GiCrossedSwords } from "react-icons/gi";
import { FaInstagram, FaYoutube } from "react-icons/fa6";

const Leftsidebar = () => {
  
  const [selected, setSelected] = useState("one");



  return (
    <>
    
   <div className='Sidebar-Mvp fixed flex justify-between w-full '>
  <div className='sidebar '>

   

    {/* Sidebar */}
    <div
      className='absolute -ml-[107px] hidden lg:block top-0 mr-20 h-full w-64 mt-15 text-2xl text-black z-40 transform transition-transform duration-300'
      
    >
      <div className="left0fleft  bg-white shadow-xl/30 mt-5 lg:ml-0 ml-[52px] w-fit lg:bg-transparent lg:shadow-none">
        
        {/* HOME */}
        <div className="home mx-10 mt-10 ">
          <div className="home-logo pb-3"><FaHome /></div>
          <div
            onClick={() => setSelected("one")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "one" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/home" className="hover:underline">HOME</Link>
          </div>
        </div>

        {/* TOURNAMENTS */}
        <div className="home mx-10 my-5">
          <div className="home-logo pb-3"><GoTrophy /></div>
          <div
            onClick={() => setSelected("two")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "two" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/turnament" className="hover:underline">TOURNAMENTS</Link>
          </div>
        </div>

        {/* RANKING */}
        <div className="home mx-10 my-6">
          <div className="home-logo pb-3"><PiRanking /></div>
          <div
            onClick={() => setSelected("three")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "three" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/ranking" className="hover:underline">RANKING</Link>
          </div>
        </div>

        {/* SCRIMS */}
        <div className="home mx-10 my-6">
          <div className="home-logo pb-3"><GiCrossedSwords /></div>
          <div
            onClick={() => setSelected("four")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "four" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/scrim" className="hover:underline">SCRIMS</Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-media  text-black font-bold mx-10 flex gap-2 my-5">
          <div>Join us:-</div>
          <div className="mt-2"><Link href="/"><FaYoutube /></Link></div>
          <div className="mt-2"><Link href="/"><FaInstagram /></Link></div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Leftsidebar
