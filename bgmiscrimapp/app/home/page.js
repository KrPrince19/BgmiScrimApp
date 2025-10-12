
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
       const res = await  fetch('https://bgmibackend.onrender.com/tournament');
        if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
        const data = await res.json();
        setTournaments(data);
      } catch (err) {
        console.error(err);
        setError('❌ Failed to fetch tournaments.');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  

  return (
    <>
      <div className=' -ml-[71px] flex flex-col items-center h-full py-22  text-black '>
      {/* This div represents the content area that would be passed as 'children' */}
      <div className="  sm:mx-68">
        <h1 className='-mt-4 text-[16px] sm:text-2xl  md:text-3xl lg:text-4xl font-bold text-white-500 underline mb-8 text-center'>
          ONGOING TOURNAMENT
        </h1>

        <div className=' w-[57vw] mr-[6px]'>
          {loading ? (
            <p className="text-black text-center">Loading tournaments...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="container flex flex-col  gap-6">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.tournamentId}
                  className=" p-6 bg-white shadow-xl/30 rounded-2xl border border-black flex flex-col sm:flex-row justify-between items-start sm:items-center  gap-4"
                >
                  <div className="flex flex-col items-center sm:items-start sm:w-auto">
                    {/* The Link component from a library like react-router-dom or Next.js would be used here. 
                        We use a simple anchor tag for demonstration. */}
                    <a href={`/details/${tournament.tournamentId}`} className="text-center sm:text-left">
                      <div className="text-black text-xl sm:text-2xl font-bold mb-2 hover:underline hover:text-cyan-400">
                        {tournament.name.toUpperCase()}
                      </div>
                    </a>

                    <div className="  flex flex-col sm:flex-row gap-4 sm:gap-10 text-black mt-4 sm:mt-0  sm:w-auto text-center sm:text-left">
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

export default HomePage;


