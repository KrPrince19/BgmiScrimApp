// "use client";
import React from "react";
import { upcomingscrims } from "../admin/admin";
import Link from "next/link";
// import { useState } from "react";

const page = () => {
  // const [selected, setSelected] = useState("one");
  return (
    <>
      <div className='turnament  flex gap-44  cursor-pointer '>
        <div>
          <h1
            className="mt-4 font-bold text-yellow-300">
            UPCOMING SCRIMS
          </h1>
        </div>
      </div>

      <div className="container flex flex-col w-[96%] h-[80vh] gap-3.5 py-2 mt-3 overflow-auto scrollbar-hide ">
        {upcomingscrims.map((scrims, idx) => (
          <div
            key={idx}
            className="card w-full bg-gray-900 p-2 -mt-2 h-auto flex justify-between items-start rounded-t-2xl border-r-1 border-l-1 border-yellow-200"
          >
            <div className="left mx-22 ">
               <div className="card-title text-white text-twire-light hover:underline hover:text-cyan-400 font-sans font-bold text-2xl mb-4"> 
                {scrims.name.toUpperCase()}
               </div>
              <div className="start-date flex gap-10 pt-4 text-amber-300 mb-2">
                <div>
                  <h1 className="text-sm font-semibold ">START DATE:-</h1>
                  <span className="text-white">{scrims.startdate}</span>
                </div>
                <div>
                  <h1 className="text-sm font-semibold">TIME:-</h1>
                  <span className="text-white">{scrims.time}</span>
                </div>
                <div>
                  <h1 className="text-sm font-semibold">MATCH</h1>
                  <span className="text-white">{scrims.match.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div >
             
    </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
