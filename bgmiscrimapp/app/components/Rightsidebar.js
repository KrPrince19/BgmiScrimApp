"use client"
import React, { useState, useEffect } from 'react'


const Rightsidebar = () => {
  const [mvpplayer, setmvpPlayer] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await fetch(`https://bgmibackend.onrender.com/mvpplayer`);
        if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
        const data = await res.json();
        setmvpPlayer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, []);



  return (
    <>
    
{/* <div className='mvpPlayer'>
      {/* ================= MVP PLAYER SECTION ================= */}
      {loading ? (
        <p className="text-white">Loading tournaments...</p>
      ) : (
        <div className="right lg:fixed left-[81%] pt-22   w-60 bg-white h-full sm:mr-0">
          {mvpplayer.map((player, idx) => (
            <div key={idx} className="card mt-10">
              <img src={player.imgSrc} className="card-img-top h-45 w-full  sm:ml-0 rounded-t-2xl" alt="..." />
              <div className="card-body bg-cyan-50  sm:ml-0 w-full text-gray-500 border rounded-b-2xl">
                <h1 className="text-2xl font-bold text-center bg-cyan-300 text-black">MVP</h1>
                <div className="kill flex-col flex">
                  <span className="clan font-bold text-2xl mx-4">{player.teamname.toUpperCase()}</span>
                  <span className="player font-bold text-2xl mx-4">{player.name.toUpperCase()}</span>
                  <span className="kill font-bold text-2xl mx-4">Kill:- {player.kill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* </div> */} 
    </>
  )
}

export default Rightsidebar
