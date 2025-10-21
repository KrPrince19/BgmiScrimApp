"use client"
import Image from "next/image";
import React, { useState, useEffect } from 'react'

const Rightsidebar = () => {
  const [mvpplayer, setmvpPlayer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');

  const messages = [
    "Welcome to FragZone!",
    "Stay tuned for upcoming tournaments!",
    "Join and show your skills in the battleground!",
    "Top MVPs will be featured here every week!",
    "Drop message on Telegram for any issue"
  ];

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await fetch('https://fragzonebackend-eggp-6qe83nwzc-krprince19s-projects.vercel.app/mvpplayer');
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

  useEffect(() => {
    let timeout;
    const current = messages[messageIndex % messages.length];

    if (displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(prev => prev + current.charAt(prev.length));
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setDisplayed('');
        setMessageIndex(prev => (prev + 1) % messages.length);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [displayed, messageIndex]);

  return (
    <>
      <div className='mvpPlayer -mt-[35px] lg:mt-0 lg:mx-4 mx-1 bg-white'> 
        {/* ================= MVP PLAYER SECTION ================= */}
        {loading ? (
          <p className="text-white">Loading tournaments...</p>
        ) : (
          <div className="right  -pt-1 lg:pt-7 w-[100%] lg:w-68 h-full sm:mr-0">
             
            {mvpplayer.map((player, idx) => (
              
              <div key={idx} className="card mt-8 lg:-mt-1 flex lg:flex-col w-[50vw] lg:w-[42vw] ">
                <img src={player.imgSrc} className="card-img-top h-45 lg:h-65   sm:ml-0 lg:rounded-t-2xl" alt="image" />
                <div className="card-body bg-cyan-50 sm:ml-0  w-[60vw] lg:w-[42vw] text-gray-500 border lg:rounded-b-2xl">
                  <h1 className="text-2xl font-bold text-center bg-cyan-300 text-black">MVP</h1>
                  <div className="kill flex-col flex w-[48vw] lg:h-30">
                    <span className="clan font-bold text-[1.2rem] lg:p-1 lg:text-2xl mx-1">Team:-{player.teamname.toUpperCase()}</span>
                    <span className="player font-bold lg:text-2xl lg:p-1 mx-1">Name:-{player.name.toUpperCase()}</span>
                    <span className="kill font-bold ;g:text-2xl lg:p-1 mx-1">Kill:- {player.kill}</span>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        )}
      </div> 
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </>
  )
}

export default Rightsidebar
