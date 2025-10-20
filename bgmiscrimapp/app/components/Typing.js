"use client"

import React, { useState, useEffect } from 'react'


const Typing = () => {

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
    <div>
       <div className="block bg-white mt-10">
              <div className="Typing_msg w-full h-[100px]  flex items-center justify-center text-xl font-bold text-gray-700 p-4">
                {displayed}
                <span className="ml-1 h-6 w-[2px] bg-black animate-blink" />
              </div>
            </div>
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

export default Typing
