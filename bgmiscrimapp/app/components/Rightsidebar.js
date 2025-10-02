"use client"
// import Link from 'next/link'
import React, { useState, useEffect } from 'react'
// import HomePage from "./home/page";

// import { FaHome } from "react-icons/fa";
// import { PiRanking } from "react-icons/pi";
// import { GoTrophy } from "react-icons/go";
// import { GiCrossedSwords } from "react-icons/gi";
// import { FaInstagram, FaYoutube } from "react-icons/fa6";
// import { Menu, X } from "lucide-react"
// import { FiMenu, FiX } from "react-icons/fi";
// import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from '@clerk/nextjs'

const Rightsidebar = () => {
  const [mvpplayer, setmvpPlayer] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/mvpplayer`);
        if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
        const data = await res.json();
        setmvpPlayer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, []);

  // useEffect(() => {
  //   const fetchAdmin = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:5000/admins`);
  //       if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
  //       const data = await res.json();
  //       setupAdmins(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchAdmin();
  // }, []);

  return (
    <>
    
{/* <div className='mvpPlayer'>
      {/* ================= MVP PLAYER SECTION ================= */}
      {loading ? (
        <p className="text-white">Loading tournaments...</p>
      ) : (
        <div className="right lg:fixed left-[81%] pt-22   w-60 bg-white h-full sm:mr-0">
          {mvpplayer.map((player, idx) => (
            <div key={idx} className="card mt-10">
              <img src={player.imgSrc} className="card-img-top h-45 w-full  sm:ml-0 rounded-t-2xl" alt="..." />
              <div className="card-body bg-cyan-50  sm:ml-0 w-full text-gray-500 border rounded-b-2xl">
                <h1 className="text-2xl font-bold text-center bg-cyan-300 text-black">MVP</h1>
                <div className="kill flex-col flex">
                  <span className="clan font-bold text-2xl mx-4">{player.teamname.toUpperCase()}</span>
                  <span className="player font-bold text-2xl mx-4">{player.name.toUpperCase()}</span>
                  <span className="kill font-bold text-2xl mx-4">Kill:- {player.kill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* </div> */} 
    </>
  )
}

export default Rightsidebar
