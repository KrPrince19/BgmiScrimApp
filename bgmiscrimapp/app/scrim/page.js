"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
// import { useState } from "react";

const Page = () => {
  const [upcomingScrim, setScrim] = useState([]);
      const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
         
  
     useEffect(() => {
           const fetchPlayer = async () => {
             try {
               const res = await fetch('https://bgmibackend.onrender.com/upcomingscrim');
               if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
               const data = await res.json();
              setScrim(data);
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
     <div className=" -ml-[71px] flex flex-col items-center min-h-screen py-8 lg:py-22  text-black ">
        {/* This div represents the content area that would be passed as 'children' */}
        <div className="  sm:mx-68">
          <h1 className="-mt-4 ml-[70px] text-[16px] sm:text-2xl  md:text-3xl lg:text-4xl font-bold text-white-500 underline mb-8 text-center">
             SCRIMS
          </h1>

          <div className=" mx-18 lg:mx-0 -mt-[22px] w-[96vw] lg:w-[60vw] mr-[6px]">
            {loading ? (
              <p className="text-black text-center">Loading tournaments...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <div className="container flex flex-col  gap-2">
                {upcomingScrim.map((tournament) => (
                  <div
                    key={tournament.tournamentId}
                    className=" p-6 w-[100%] bg-white shadow-xl/30 rounded-2xl border border-black hover:border-cyan-400 flex flex-col sm:flex-row justify-between items-start sm:items-center  gap-4"
                  >
                    <div className=" w-[100%] flex flex-col items-center sm:items-start ">
                      {/* The Link component from a library like react-router-dom or Next.js would be used here. 
                        We use a simple anchor tag for demonstration. */}
                      <a
                        href={`/details/${tournament.tournamentId}`}
                        className="text-center sm:text-left"
                      >
                        <div className="text-black text-xl sm:text-2xl font-bold mb-2 hover:underline hover:text-cyan-400">
                          {tournament.name.toUpperCase()}
                        </div>
                      </a>
          

                      <div className="w-[100%] ml-[-31px] lg:ml-[0] flex flex-col lg:flex-row items-center lg:justify-between gap-4  text-black mt-4 sm:mt-0  text-center sm:text-left">
                        <div className="date flex gap-6">
                          <div>
                            <h1 className="text-sm font-semibold">
                               DATE:
                            </h1>
                            <span className="text-black text-sm">
                              {tournament.date}
                            </span>
                          </div>
                          <div>
                            <h1 className="text-sm font-semibold">TIME:</h1>
                            <span className="text-black text-sm">
                              {tournament.time}
                            </span>
                          </div>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
