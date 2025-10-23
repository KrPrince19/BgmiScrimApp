"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [selected, setSelected] = useState("one");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tournaments, setupComingTournaments] = useState([]);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // 🧠 Dummy tournament data (replace with API if needed)
 useEffect(() => {
                const fetchPlayer = async () => {
                  try {
        const res = await fetch('https://bgmibackend.onrender.com/upcomingtournament');
                    if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
                    const data = await res.json();
                   setupComingTournaments(data);
                  } catch (err) {
                    console.error(err);
                    setError("❌ Failed to fetch player.");
                  } finally {
                    setLoading(false);
                  }
                };
            
                fetchPlayer();
              }, []);

  // 🪄 Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTournaments([]);
      setShowDropdown(false);
    } else {
      const results = tournaments.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTournaments(results);
      setShowDropdown(true);
    }
  }, [searchTerm, tournaments]);

  // 🖱️ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-4 md:px-10 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl lg:text-3xl font-bold text-cyan-500">Fr</span>
          <span className="text-2xl lg:text-3xl font-bold text-red-600">ag</span>
          <span className="text-2xl lg:text-3xl font-bold text-cyan-500">Zo</span>
          <span className="text-2xl lg:text-3xl font-bold text-red-600">ne</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-semibold text-black">
          <Link href="/" onClick={() => setSelected("one")}
            className={` font-bold transition-colors ${
              selected === "one" ? "text-cyan-300 underline" : "text-black"
            }`}>Home</Link>
          <Link href="/tournament" onClick={() => setSelected("two")}
            className={` font-bold transition-colors ${
              selected === "two" ? "text-cyan-300 underline" : "text-black"
            }`}>Tournaments</Link>
         <Link href="/ranking" onClick={() => setSelected("three")}
            className={` font-bold transition-colors ${
              selected === "three" ? "text-cyan-300 underline" : "text-black"
            }`}>Ranking</Link>
        <Link href="/scrim" onClick={() => setSelected("four")}
            className={` font-bold transition-colors ${
              selected === "four" ? "text-cyan-300 underline" : "text-black"
            }`}>Scrims</Link>

          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center bg-gray-900 text-white rounded-xl px-3 py-2">
              <input
                type="text"
                placeholder="Search Upcoming Tournaments..."
                className="bg-transparent outline-none w-64 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowDropdown(true)}
              />
              <Search size={18} />
            </div>

            {showDropdown && (
              <div className="absolute mt-2 bg-white rounded-xl shadow-lg w-full max-h-60 overflow-y-auto border border-gray-300 z-40">
                {filteredTournaments.length > 0 ? (
                  filteredTournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="px-4 py-3 hover:bg-cyan-100 cursor-pointer"
                    >
                      <p className="font-bold">{tournament.name}</p>
                      <p className="text-sm text-gray-600">
                        Starts {tournament.startdate} - End {tournament.enddate}
                      </p>
                      <p><Link href={`/joinmatch/${tournament.tournamentId}`}>Join</Link></p>
                      <p><Link href={`/details/${tournament.tournamentId}`}>Detail</Link></p>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-3 text-gray-500">No tournaments found</p>
                )}
              </div>
            )}
          </div>

          <SignedOut>
            <SignInButton>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
          <Link href="/profile" onClick={() => setSelected("five")}
            className={` font-bold transition-colors ${
              selected === "five" ? "text-cyan-300 underline" : "text-black"
            }`}>Profile</Link>
          </SignedIn>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center text-cyan-300">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white shadow-lg py-4 px-6 space-y-3 font-semibold text-black"
        >
          <Link href="/" onClick={() => setSelected("one")}
            className={`p-2 text-[13px] font-bold transition-colors ${
              selected === "one" ? "text-cyan-300 underline" : "text-black"
            }`}>Home</Link>
          <Link href="/tournament" onClick={() => setSelected("two")}
            className={`p-2 text-[13px] font-bold transition-colors ${
              selected === "two" ? "text-cyan-300 underline" : "text-black"
            }`}>Tournaments</Link>
         <Link href="/ranking" onClick={() => setSelected("three")}
            className={`p-2 text-[13px] font-bold transition-colors ${
              selected === "three" ? "text-cyan-300 underline" : "text-black"
            }`}>Ranking</Link>
        <Link href="/scrim" onClick={() => setSelected("four")}
            className={`p-2 text-[13px] font-bold transition-colors ${
              selected === "four" ? "text-cyan-300 underline" : "text-black"
            }`}>Scrims</Link>

          <div className="relative mt-3" ref={dropdownRef}>
            <div className="flex items-center bg-gray-900 text-white rounded-xl px-3 py-2">
              <input
                type="text"
                placeholder="Search Tournaments..."
                className="bg-transparent outline-none w-full placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowDropdown(true)}
              />
              <Search size={18} />
            </div>

            {showDropdown && (
              <div className="absolute mt-2 bg-white rounded-xl shadow-lg w-full border border-gray-300 z-40">
                {filteredTournaments.length > 0 ? (
                  filteredTournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="px-4 py-3 hover:bg-cyan-100 cursor-pointer"
                    >
                      <p className="font-bold">{tournament.name}</p>
                      <p className="text-sm text-gray-600">
                        Starts {tournament.start} - End {tournament.end}
                      </p>
                        <p><Link href={`/joinmatch/${tournament.tournamentId}`}>Join</Link></p>
                      <p><Link href={`/details/${tournament.tournamentId}`}>Detail</Link></p>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-3 text-gray-500">No tournaments found</p>
                )}
              </div>
            )}
          </div>

          <SignedOut>
            <SignInButton>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="w-full bg-cyan-500 text-white px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/profile" onClick={() => setSelected("five")}
            className={` font-bold transition-colors ${
              selected === "five" ? "text-cyan-300 underline" : "text-black"
            }`}>Profile</Link>
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
