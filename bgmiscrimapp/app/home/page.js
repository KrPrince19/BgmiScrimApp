"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
     const fetchPlayer = async () => {
       try {
                const res = await fetch('https://bgmibackend.onrender.com/tournament');
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
    <div className="ml-1 lg:-ml-[21px] flex flex-col bg-white items-center min-h-screen mt-4 lg:mt-0 text-black">
      <div className="sm:mx-68">
        <div className="turnament flex gap-10 mx-0 lg:mx-18 cursor-pointer">
          <h1 className="-mt-4 ml-[71px] text-center text-[16px] sm:text-2xl md:text-3xl lg:text-2xl font-bold text-white-500 underline mb-8">
            ONGOING TOURNAMENT
          </h1>
        </div>

        <div className="-mt-8 w-[96vw] lg:w-[55vw] lg:ml-10">
          {loading ? (
            <p className="text-black text-center">Loading tournaments...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="container mt-4 flex flex-col gap-2">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.tournamentId}
                  className="p-6 w-full bg-white shadow-xl rounded-2xl border border-black hover:border-cyan-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="w-full flex flex-col items-center sm:items-start">
                    <Link href={`/details/${tournament.tournamentId}`}>
                      <div className="text-black text-xl sm:text-2xl font-bold mb-2 hover:underline hover:text-cyan-400">
                        {tournament.name.toUpperCase()}
                      </div>
                    </Link>
                    <div className="w-full flex flex-col lg:flex-row items-center lg:justify-between gap-4 text-black mt-4 sm:mt-0 text-center sm:text-left">
                      <div className="date flex gap-6">
                        <div>
                          <h1 className="text-sm font-semibold">START DATE:</h1>
                          <span className="text-black text-sm">{tournament.startdate}</span>
                        </div>
                        <div>
                          <h1 className="text-sm font-semibold">END DATE:</h1>
                          <span className="text-black text-sm">{tournament.enddate}</span>
                        </div>
                      </div>
                      <div className="detail-btn -mt-4">
                        <Link href={`/details/${tournament.tournamentId}`}>
                          <button className="text-black hover:underline hover:text-cyan-400 font-semibold px-4 py-2 rounded-md transition-colors duration-200">
                            DETAILS
                          </button>
                        </Link>
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
  );
};

export default HomePage;
