'use client';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { FaHome, FaYoutube, FaInstagram } from 'react-icons/fa';
import { GoTrophy } from 'react-icons/go';
import { PiRanking } from 'react-icons/pi';
import { GiCrossedSwords } from 'react-icons/gi';

const Navbar = ({ admin = [] }) => {
  const [tournaments, setTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState('one');

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://bgmibackend.onrender.com/upcomingtournament');
      const data = await res.json();
      setTournaments(data);
    };
    fetchData();
  }, []);

  // ✅ Filter tournaments by search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTournaments([]);
    } else {
      const filtered = tournaments.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTournaments(filtered);
    }
  }, [searchTerm, tournaments]);

  // ✅ Close menu or search when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close sidebar
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.menu-btn')) {
        setMenuOpen(false);
      }
      // Close search
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="Navbar fixed w-full h-15 bg-white shadow-xl/35 border-b-2 border-cyan-200 z-50 text-black text-2xl px-4">
        <div className="flex justify-between items-center">
          {/* Left Logo */}
          <div className="left flex w-[25%] mt-4 lg:mt-0 lg:mx-8 m-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide font-press-start">
              <span className="text-red-400 drop-shadow-lg">frag</span>
              <span className="text-cyan-400 drop-shadow-lg">Zone</span>
            </h1>
          </div>

          {/* Desktop Right Section */}
          <div className="right sm:flex justify-around w-[64%] text-white" ref={searchRef}>
            <input
              className="pl-4 mr-38 mt-4 border hidden lg:block border-gray-600 rounded-xl w-[250px] placeholder-gray-50 placeholder:text-sm bg-gray-800"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search UpcomingTournaments..."
            />
            <div className="mt-2">
              <div className='hidden lg:block'>

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
              </div>
              <SignedIn>
                <div className="mx-10 mt-10">
                  <div
                    onClick={() => setSelected('one')}
                    className={`hidden lg:block -mt-6 font-bold transition-colors ${
                      selected === 'one' ? 'text-cyan-200 underline' : 'text-black'
                    }`}
                  >
                    <Link href="/profile" className="hover:underline">
                      Profile
                    </Link>
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>

          {/* Hamburger (Mobile only) */}
          <div className="lg:hidden flex items-center text-black menu-btn">
            {menuOpen ? (
              <X className="w-8 h-8 cursor-pointer" onClick={() => setMenuOpen(false)} />
            ) : (
              <Menu className="w-8 h-8 cursor-pointer" onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>

        {/* Search results under navbar (Desktop) */}
        <div className="flex justify-center w-full" ref={searchRef}>
          {searchTerm.trim() !== "" && (
            <div className="absolute top-[100px] lg:top-16 mr-[75px] w-[60vw] z-40">
              {filteredTournaments.length > 0 ? (
                filteredTournaments.map((tournament) => (
                  <div
                    key={tournament.tournamentId}
                    className="p-6 bg-cyan-200 shadow-xl/30 rounded-2xl border border-black flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-4"
                  >
                    <div className="w-full flex flex-col items-center sm:items-start">
                      <Link href={`/details/${tournament.tournamentId}`} onClick={() => setSearchTerm("")}>
                        <div className="text-black text-xl sm:text-2xl font-bold mb-2 hover:underline hover:text-cyan-400">
                          {tournament.name.toUpperCase()}
                        </div>
                      </Link>
                      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 text-black text-center sm:text-left">
                        <div className="flex gap-6">
                          <div>
                            <h1 className="text-sm font-semibold">START DATE:</h1>
                            <span className="text-black text-sm">{tournament.startdate}</span>
                          </div>
                          <div>
                            <h1 className="text-sm font-semibold">END DATE:</h1>
                            <span className="text-black text-sm">{tournament.enddate}</span>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Link href={`/joinmatch/${tournament.tournamentId}`}>
                            <button className="text-black hover:underline hover:text-cyan-400 font-semibold px-4 py-2 rounded-md">
                              JOIN
                            </button>
                          </Link>
                          <Link href={`/details/${tournament.tournamentId}`}>
                            <button className="text-black hover:underline hover:text-cyan-400 font-semibold px-4 py-2 rounded-md">
                              DETAILS
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center bg-cyan-200 shadow-xl/30 rounded-2xl border border-black w-full h-[100px] mt-4 flex items-center justify-center">
                  No tournaments found 😢
                </p>
              )}
            </div>
          )}
        </div>
      </div>

    {/* ================= MOBILE SIDEBAR ================= */}
{menuOpen && (
  <div
    ref={menuRef}
    className="fixed inset-0 z-40 bg-white sm:w-2/3 w-4/5 p-6 overflow-y-auto"
  >
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-extrabold font-press-start">
        <span className="text-red-400">frag</span>
        <span className="text-cyan-400">Zone</span>
      </h1>
      <X className="w-6 h-6 text-black cursor-pointer" onClick={() => setMenuOpen(false)} />
    </div>

    {/* ✅ Auth Buttons / Profile for mobile */}
   

    {/* ✅ Mobile Search */}
    <div ref={searchRef}>
      <input
        className="pl-4 mt-2 border border-gray-600 rounded-xl w-full placeholder:text-[12px] placeholder-gray-200 bg-gray-800 text-white"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search UpcomingTournaments..."
      />

      {/* ✅ Mobile search results */}
      {searchTerm.trim() !== "" && (
        <div className="mt-3 bg-white shadow rounded-lg p-2">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((t) => (
              <div
                key={t.tournamentId}
                onClick={() => setSearchTerm("")}
                className="p-2 border-b last:border-none hover:bg-gray-100 cursor-pointer"
              >
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.startdate} - {t.enddate}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm p-2">No tournaments found 😢</p>
          )}
        </div>
      )}
    </div>

    {/* ✅ Sidebar Links */}
    <div className="space-y-4 mt-4">
       <div className="mb-4 mr-28">
      <SignedOut>
        <div className="flex  gap-2">
          <button className=" inline-flex items-center justify-center h-[34px]  text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500">
            <span className="w-[85px]   rounded-md bg-transparent">
              <SignInButton />
            </span>
          </button>
          <button className=" inline-flex items-center h-[34px] justify-center p-0.5 text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500">
            <span className="w-[85px] rounded-md bg-transparent">
              <SignUpButton />
            </span>
          </button>
        </div>
      </SignedOut>

      <SignedIn>
        <div
          onClick={() => {
            setSelected('profile');
            setMenuOpen(false);
          }}
          className={`mt-2 font-bold text-center ${
            selected === 'profile' ? 'text-cyan-300 underline' : 'text-black'
          }`}
        >
          <Link href="/profile">Profile</Link>
        </div>
      </SignedIn>
    </div>
      {[
        { icon: <FaHome />, label: 'HOME', path: '/home', id: 'one' },
        { icon: <GoTrophy />, label: 'TOURNAMENTS', path: '/turnament', id: 'two' },
        { icon: <PiRanking />, label: 'RANKING', path: '/ranking', id: 'three' },
        { icon: <GiCrossedSwords />, label: 'SCRIMS', path: '/scrim', id: 'four' },
      ].map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          {item.icon}
          <div
            onClick={() => {
              setSelected(item.id);
              setMenuOpen(false);
            }}
            className={`font-bold ${selected === item.id ? 'text-cyan-300 underline' : 'text-black'}`}
          >
            <Link href={item.path}>{item.label}</Link>
          </div>
        </div>
      ))}
    </div>

    {/* ✅ Social Links */}
    <div className="mt-6 flex text-black font-bold items-center gap-3">
      <span>Join us:</span>
      <Link href="/"><FaYoutube /></Link>
      <Link href="/"><FaInstagram /></Link>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
