"use client";

import { UserButton } from '@clerk/nextjs';
import React, { useEffect, useState } from "react";

export default function UserDashboard({ userEmail, name }) {
  const [Joindata, setJoindata] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const res = await  fetch('https://bgmibackend.onrender.com/joinmatches`);
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setJoindata(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tournament data.");
      }
    };

    fetchTournamentDetails();
  }, []);

  useEffect(() => {
    if (Joindata.length > 0) {
      const foundTournament = Joindata.find(
        (t) => String(t.playerEmail).trim() === userEmail
      );
      setTournament(foundTournament || null);
    }
  }, [Joindata, userEmail]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!tournament) {
    return <p>Loading tournament details...</p>;
  }

  return (
    <div className="w-[90%] min-h-screen flex items-start justify-center mt-20 py-8">
  <div className="bg-white text-black shadow-lg rounded-lg lg:w-[70vw] flex flex-col items-center">
    <UserButton />
    <p className="text-center mb-4">Hi, {name} — Welcome to FragZone</p>

    <div className="w-[40vw] sm:1-[30vw] h-full bg-white border-1 border-black rounded-2xl shadow-xl/shadow ">
      <h1 className="text-center font-bold">Joined Match</h1>
      <h1 className=" text-[15px] text-center sm:text-2xl  lg:text-[20px] font-bold font-sans mb-4"><span className='text-[20px] text-black'>Tournament:-</span>
        {tournament.tournamentName?.toUpperCase() || "First Player Not Available"}
      </h1>
      <h1 className=" text-[15px] text-center sm:text-2xl  lg:text-[20px] font-bold font-sans mb-4"><span className='text-[20px] text-black'>1st PlayerName:-</span>
        {tournament.firstPlayer?.toUpperCase() || "First Player Not Available"}
      </h1>
      <h1 className=" text-[15px] text-center sm:text-2xl  lg:text-[20px] font-bold font-sans mb-4"><span className='text-[20px] text-black'>2nd PlayerName:-</span>
        {tournament.secondPlayer?.toUpperCase() || "First Player Not Available"}
      </h1>
      <h1 className=" text-[15px] text-center sm:text-2xl  lg:text-[20px] font-bold font-sans mb-4"><span className='text-[20px] text-black'>3rd PlayerName:-</span>
        {tournament.thirdPlayer?.toUpperCase() || "First Player Not Available"}
      </h1>
      <h1 className=" text-[15px] text-center sm:text-2xl  lg:text-[20px] font-bold font-sans mb-4"><span className='text-[20px] text-black'>4th PlayerName:-</span>
        {tournament.fourthPlayer?.toUpperCase() || "First Player Not Available"}
      </h1>
    </div>
     <h1 className="text-red-500">
      {process.env.NEXT_PUBLIC_MATCH_PASSWORD === "" ? (
        <span>You get RoomID & Password before 15 minutes of Match Start time.</span>
      ) : (
        <span>
          <span>Room Id Is:- {process.env.NEXT_PUBLIC_MATCH_ROOMID} </span>
          <br />
          <span>Password Is:- {process.env.NEXT_PUBLIC_MATCH_PASSWORD} </span>
        </span>
      )}
    </h1>
  </div>
</div>

  );
}
