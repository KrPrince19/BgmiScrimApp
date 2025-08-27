'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [tournament, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('one');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch('http://localhost:5000/tournament');
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setTournaments(data);
      } catch (err) {
        console.error('❌ Error fetching tournaments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <>
   <div className='turnament  flex gap-44  cursor-pointer '>
        <div>
          <h1
            onClick={() => setSelected("one")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "one" ? "text-yellow-500 underline": "text-white"
            }`}
          >
             <Link href="/turnament" >
            ONGOING TURNAMENT
            </Link>
          </h1>
        </div>
        <div>
          <h1
            onClick={() => setSelected("two")}
            className={`-mt-4 font-bold transition-colors ${
              selected === "two" ? "text-yellow-500 underline" : "text-white"
            }`}
          >
            <Link href="/upcomingturnament" >
            UPCOMING TURNAMENT
            </Link>
          </h1>
        </div>
      </div>

       {loading ? (
        <p className="text-white">Loading tournaments...</p>
      ) : ( 
         <div className="container flex flex-col w-full h-[80vh] gap-3.5 py-4 ">
      {tournament.map((tournament, idx) => (
        <div
          key={idx}
          className="card w-full bg-gray-900 p-2 -mt-2 h-auto flex justify-between items-start rounded-md"
        >
          <div className="left mx-22">
           <Link  className="text-black" href={`/details/${tournament.id}`}>
               <div className="card-title text-white text-twire-light hover:underline hover:text-cyan-400 font-sans font-bold text-2xl mb-4"> 
                {tournament.name.toUpperCase()}
               </div>
              </Link>
            <div className="start-date flex gap-10 pt-4 text-amber-300 mb-2">
              <div>
                <h1 className="text-sm font-semibold ">START DATE:-</h1>
                <span className="text-white">{tournament.startdate}</span>
              </div>
              <div>
                <h1 className="text-sm font-semibold">END DATE:-</h1>
                <span className="text-white">{tournament.enddate}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="detail  mt-12 ">
              <Link  className="text-black" href={`/details/${tournament.id}`}>
            <button className="text-yellow-300  hover:underline  hover:text-cyan-400">DETAILS</button>
          </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
      )}
    </>
  );
};

export default Page;
