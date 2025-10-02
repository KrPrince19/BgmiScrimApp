'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import axios from 'axios';

const Page = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('one');
    const [error, setError] = useState(null);
  

  useEffect(() => {
     const fetchPlayer = async () => {
       try {
         const res = await fetch(`http://localhost:5000/tournament`);
         if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
         const data = await res.json();
         setTournaments(data);
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
      {/* Toggle Navigation */}
      {/* <div className='turnament flex gap-44 cursor-pointer'>
        <div>
          <h1
            onClick={() => setSelected("one")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "one" ? "text-yellow-500 underline" : "text-black"
            }`}
          >
            <Link href="/turnament">ONGOING TOURNAMENT</Link>
          </h1>
        </div>
        <div>
          <h1
            onClick={() => setSelected("two")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "two" ? "text-yellow-500 underline" : "text-black"
            }`}
          >
            <Link href="/upcomingturnament">UPCOMING TOURNAMENT</Link>
          </h1>
        </div>
      </div> */}

      {/* Data Loader */}
      {/* {loading ? (
        <p className="text-black">Loading tournaments...</p>
      ) : (
        <div className="container flex flex-col w-[96%] h-[80vh] gap-3.5 py-4">
          {tournaments.map((tournament, idx) => (
            <div
              key={idx}
              className="card w-full bg-gray-900 p-2 -mt-2 h-auto flex justify-between items-start rounded-t-2xl border-r-1 border-l-1 border-yellow-200"
            >
              <div className="left mx-22">
                <Link className="text-black" href={`/details/${tournament.tournamentId}`}>
                  <div className="card-title text-black hover:underline hover:text-cyan-400 font-sans font-bold text-2xl mb-4">
                    {tournament.name.toUpperCase()}
                  </div>
                </Link>
                <div className="start-date flex gap-10 pt-4 text-amber-300 mb-2">
                  <div>
                    <h1 className="text-sm font-semibold">START DATE:-</h1>
                    <span className="text-black">{tournament.startdate}</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold">END DATE:-</h1>
                    <span className="text-black">{tournament.enddate}</span>
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="detail mt-12">
                  <Link className="text-black" href={`/details/${tournament.tournamentId}`}>
                    <button className="text-black hover:underline hover:text-cyan-400">
                      DETAILS
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}


 <div className=' -ml-[71px] flex flex-col items-center  min-h-screen py-22 text-black '>
      {/* This div represents the content area that would be passed as 'children' */}
      <div className="  sm:mx-68">
        <div className='turnament flex  md:gap-20 cursor-pointer'>
        <div>
          <h1
            onClick={() => setSelected("one")}
            className={`-mt-4 text-[16px] sm:text-2xl font-bold transition-colors ${
              selected === "one" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/turnament">ONGOING TOURNAMENT</Link>
          </h1>
        </div>
        <div>
          <h1
            onClick={() => setSelected("two")}
            className={`-mt-4 text-[16px] sm:text-2xl font-bold transition-colors ${
              selected === "two" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/upcomingturnament">UPCOMING TOURNAMENT</Link>
          </h1>
        </div>
      </div> 

        <div className=' w-[57vw] mr-[6px]'>
          {loading ? (
            <p className="text-black text-center">Loading tournaments...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="container   mt-4 flex flex-col  gap-6">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.tournamentId}
                  className=" p-6 rounded-2xl border bg-white shadow-xl/30 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center  gap-4"
                >
                  <div className="flex flex-col items-center sm:items-start sm:w-auto ">
                    {/* The Link component from a library like react-router-dom or Next.js would be used here. 
                        We use a simple anchor tag for demonstration. */}
                    <a href={`/details/${tournament.tournamentId}`} className="text-center sm:text-left">
                      <div className="text-black text-xl sm:text-2xl font-bold mb-2 hover:underline hover:text-cyan-400">
                        {tournament.name.toUpperCase()}
                      </div>
                    </a>

                    <div className="  flex flex-col sm:flex-row gap-4 sm:gap-10 text-black mt-4 sm:mt-0  sm:w-auto text-center sm:text-left  ">
                      <div>
                        <h1 className="text-sm font-semibold">START DATE:</h1>
                        <span className="text-black text-sm">{tournament.startdate}</span>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">END DATE:</h1>
                        <span className="text-black text-sm">{tournament.enddate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-4 sm:gap-2 justify-center sm:justify-start sm:w-auto mt-4 sm:mt-0">
                    {/* <a href={`/joinmatch/${tournament.tournamentId}`}>
                      <button className=" sm:w-auto text-black hover:underline hover:text-cyan-400 font-semibold px-4 py-2 rounded-md transition-colors duration-200">
                        JOIN
                      </button>
                    </a> */}
                    <a href={`/details/${tournament.tournamentId}`}>
                      <button className=" sm:w-auto text-black hover:underline hover:text-cyan-400 font-semibold px-4 py-2 rounded-md transition-colors duration-200">
                        DETAILS
                      </button>
                    </a>
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
