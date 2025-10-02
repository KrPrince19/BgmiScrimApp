"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Menu, X } from "lucide-react"


import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false); // Navbar hamburger
  const [selected, setSelected] = useState("one");



  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="Navbar w-full fixed h-15 bg-white shadow-xl/35 border-2 border-b-cyan-200 text-white text-2xl px-4  z-50">
        <div className="flex justify-between items-center">
          {/* Left Logo */}
          <div className="left flex justify-around w-[25%] sm:-mt-1 lg:-mt-0 m-2 ">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide font-press-start">
              <span className="text-red-400 drop-shadow-lg">frag</span>
              <span className="text-cyan-400 drop-shadow-lg">Zone</span>
            </h1>
          </div>

          {/* Desktop Right Section */}
          <div className="right hidden sm:flex justify-around w-[64%] text-white">
            <div> 
              <input
                className="pl-4 mt-4 border border-gray-600 rounded-xl w-[300px] placeholder-gray-50 bg-gray-800"
                type="text"
                placeholder="search..."
              />
            </div>
            <div className='mt-2'>
              <SignedOut>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-2 text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500">
                  <span className="relative px-5 py-2.5 rounded-md bg-transparent">
                    <SignInButton />
                  </span>
                </button>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-2 text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500">
                  <span className="relative px-5 py-2.5 rounded-md bg-transparent">
                    <SignUpButton />
                  </span>
                </button>
              </SignedOut>
              <SignedIn>
                <div className="home mx-10 mt-10">
                  <div
                    onClick={() => setSelected("one")}
                    className={`-mt-6 font-bold transition-colors ${
                      selected === "one" ? "text-cyan-200 underline" : "text-black"
                    }`}
                  >
                    <Link href="/profile" className="hover:underline">
                      {/* <UserButton /> */}
                      Profile
                    </Link>
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>

          {/* Navbar Hamburger (Mobile only) */}
          <div className="sm:hidden flex items-center text-black">
            {menuOpen ? (
              <X className="w-8 h-8 cursor-pointer" onClick={() => setMenuOpen(false)} />
            ) : (
              <Menu className="w-8 h-8 cursor-pointer" onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed top-0 right-0 h-full w-2/3 bg-white shadow-xl/40 text-white p-6  z-50 flex flex-col gap-4">
            <button onClick={() => setMenuOpen(false)} className="self-end">
              <X className="w-6 h-6 text-black" />
            </button>
            <input
              className="pl-4 border border-gray-600 rounded-xl w-full placeholder-gray-50 bg-gray-800"
              type="text"
              placeholder="search..."
            />
            <SignedOut>
              <button className="px-5 py-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
                <SignInButton />
              </button>
              <button className="px-5 py-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <SignUpButton />
              </button>
            </SignedOut>
            <SignedIn>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className={`font-bold transition-colors ${
                  selected === "one" ? "text-cyan-200 underline" : "text-black"
                }`}
              >
                Profile
              </Link>
            </SignedIn>
          </div>
        )}
      </div>


     {/*  */}
    </>
  )
}

export default Navbar
