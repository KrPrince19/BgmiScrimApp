"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
// import HomePage from "./home/page";

import { FaHome } from "react-icons/fa";
import { PiRanking } from "react-icons/pi";
import { GoTrophy } from "react-icons/go";
import { GiCrossedSwords } from "react-icons/gi";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { Menu, X } from "lucide-react"
import { FiMenu, FiX } from "react-icons/fi";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Leftsidebar = () => {
  const [mvpplayer, setmvpPlayer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setupAdmins] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Navbar hamburger
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar hamburger
  const [selected, setSelected] = useState("one");

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

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`http://localhost:5000/admins`);
        if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
        const data = await res.json();
        setupAdmins(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <>
    
   <div className='Sidebar-Mvp fixed flex justify-between w-full '>
  <div className='sidebar '>

    {/* ================= SIDEBAR ================= */}
    {/* Sidebar Hamburger (Visible only below lg) */}
    <div className="lg:hidden absolute top-14 left-1 z-50 p-1 rounded-lg items-center gap-2
                    shadow-md -ml-[64px]">
      {/* Arrow Icon */}
      {sidebarOpen ? (
        <FiChevronLeft
          className="w-8 h-8 cursor-pointer text-purple-700"
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <FiChevronRight
          className="w-8 h-8 cursor-pointer text-purple-700"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Vertical Text */}
      <div className="font-bold flex flex-col justify-center text-center tracking-wider 
                      bg-clip-text text-transparent bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 drop-shadow-md">
        <span>S</span>
        <span>I</span>
        <span>D</span>
        <span>E</span>
        <span>B</span>
        <span>A</span>
        <span>R</span>
      </div>
    </div>

    {/* Sidebar */}
    <div
      className={`absolute -ml-[107px] lg:fixed top-0 mr-20 h-full w-64 mt-15 text-2xl text-black z-40 transform transition-transform duration-300 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div className="left0fleft bg-white shadow-xl/30 mt-5 lg:ml-0 ml-[52px] w-fit lg:bg-transparent lg:shadow-none">
        
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
  {/* <Link href="/adminsignup">SignUp/LogIn as Admin</Link> */}
        {/* Admin */}
        {admin.map((admindata, idx) => {
          const isVerified = admindata.isVerified;
          return (
            <div key={idx}>
              {isVerified ? (
                <button className="mx-7 font-bold my-4 py-2.5 rounded-lg bg-white text-black">
                  <Link href="/admindashboard">Admin Dashboard</Link>
                </button>
              ) : (
                <button className="mx-10 my-4 mr-[60px] py-2.5 rounded-lg bg-white font-bold text-black hover:underline">
                    <div
            onClick={() => setSelected("five")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "five" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
         <Link href="/adminsignup">SignUp/LogIn as Admin</Link>
         </div>
                </button>
              )}
            </div>
          );
        })}

        {/* Social Media */}
        <div className="social-media mx-10 flex gap-2 my-5">
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
