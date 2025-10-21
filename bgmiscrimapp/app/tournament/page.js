'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('one');
    const [error, setError] = useState(null);
  

  useEffect(() => {
     const fetchPlayer = async () => {
       try {
         const res = await  fetch('https://fragzonebackend-eggp-6qe83nwzc-krprince19s-projects.vercel.app/tournament');
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
    
 <div className=' ml-2 lg:-ml-[21px] flex flex-col items-center  min-h-screen py-5 text-black '>
      {/* This div represents the content area that would be passed as 'children' */}
      <div className="  sm:mx-68">
        <div className='turnament flex gap-10 mx-10 cursor-pointer'>
        <div>
          <h1
            onClick={() => setSelected("one")}
            className={`-mt-4 text-[12px] lg:text-2xl font-bold transition-colors ${
              selected === "one" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/turnament">ONGOING TOURNAMENT</Link>
          </h1>
        </div>
        <div>
          <h1
            onClick={() => setSelected("two")}
            className={`-mt-4 text-[12px] lg:text-2xl font-bold transition-colors ${
              selected === "two" ? "text-cyan-300 underline" : "text-black"
            }`}
          >
            <Link href="/upcomingturnament">UPCOMING TOURNAMENT</Link>
          </h1>
        </div>
      </div> 

        <div className=' w-[96vw] lg:w-[55vw] lg:ml-10'>
          {loading ? (
            <p className="text-black text-center">Loading tournaments...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="container   mt-4 flex flex-col  gap-2">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.tournamentId}
                className=" p-6 w-[100%] bg-white shadow-xl/30 rounded-2xl border border-black  hover:border-cyan-400 flex flex-col sm:flex-row justify-between items-start sm:items-center  gap-4">
              <div className=" w-[100%] flex flex-col items-center sm:items-start ">
                  
                    <a href={`/details/${tournament.tournamentId}`} className="text-center sm:text-left">
                      <div className="text-black text-xl sm:text-2xl font-bold mb-2 hover:underline hover:text-cyan-400">
                        {tournament.name.toUpperCase()}
                      </div>
                    </a>
                      <div className="w-[100%] ml-[-31px] lg:ml-[0] flex flex-col lg:flex-row items-center lg:justify-between gap-4  text-black mt-4 sm:mt-0  text-center sm:text-left">
                        <div className="date flex gap-6">
                          <div>
                            <h1 className="text-sm font-semibold">
                              START DATE:
                            </h1>
                            <span className="text-black text-sm">
                              {tournament.startdate}
                            </span>
                          </div>
                          <div>
                            <h1 className="text-sm font-semibold">END DATE:</h1>
                            <span className="text-black text-sm">
                              {tournament.enddate}
                            </span>
                          </div>
                        </div>
                        <div className="detail-btn -mt-4">
                          <div className="">
                            <a href={`/details/${tournament.tournamentId}`}>
                              <button className=" sm:w-auto text-black hover:underline hover:text-cyan-400 font-semibold px-4 py-2 rounded-md transition-colors duration-200">
                                DETAILS
                              </button>
                            </a>
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
