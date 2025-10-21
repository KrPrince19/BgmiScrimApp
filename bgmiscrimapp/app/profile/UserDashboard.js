"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

export default function UserDashboard({ userEmail, name }) {
  const [Joindata, setJoindata] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const res = await fetch("https://fragzonebackend-eggp-6qe83nwzc-krprince19s-projects.vercel.app/joinmatches");
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setJoindata(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tournament data.");
      } finally {
        setLoading(false); // ✅ Stop loading after fetch
      }
    };

    fetchTournamentDetails();
  }, []);

  useEffect(() => {
    if (Joindata.length > 0 && userEmail) {
      const foundTournament = Joindata.find(
        (t) => String(t.playerEmail).trim() === userEmail.trim()
      );
      setTournament(foundTournament || null);
    }
  }, [Joindata, userEmail]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading tournament details...</p>;
  }

  if (!tournament) {
    return (
      <div className="text-center mt-20 h-[100vh]">
        <UserButton />
          <p className="text-center text-black mb-4">
          Hi, {name} — Welcome to FragZone
        </p>
        <p className="text-lg font-semibold text-gray-600 mt-4">
          No joined match found for your account ({userEmail})
        </p>
      </div>
    );
  }

  return (
    <div className="w-[90%] h-[100vh] flex items-start justify-center mx-4 mt-2 lg:mt-20 py-8">
      <div className="bg-white text-black shadow-lg rounded-lg lg:w-[70vw] flex flex-col items-center">
        <UserButton />
        <p className="text-center text-black mb-4">
          Hi, {name} — Welcome to FragZone
        </p>

        <div className="w-[100%] lg:w-[40vw]  h-[100%] bg-white border border-black rounded-2xl shadow-xl p-4">
          <h1 className="text-center font-bold">Joined Match</h1>
          <h1 className="text-[15px] text-center sm:text-2xl lg:text-[20px] font-bold font-sans mb-4">
            <span className="text-[20px] text-black">Tournament: </span>
            {tournament.tournamentName?.toUpperCase() || "Not Available"}
          </h1>
          <h1 className="text-[15px] text-center sm:text-2xl lg:text-[20px] font-bold font-sans mb-4">
            <span className="text-[20px] text-black">1st Player: </span>
            {tournament.firstPlayer?.toUpperCase() || "Not Available"}
          </h1>
          <h1 className="text-[15px] text-center sm:text-2xl lg:text-[20px] font-bold font-sans mb-4">
            <span className="text-[20px] text-black">2nd Player: </span>
            {tournament.secondPlayer?.toUpperCase() || "Not Available"}
          </h1>
          <h1 className="text-[15px] text-center sm:text-2xl lg:text-[20px] font-bold font-sans mb-4">
            <span className="text-[20px] text-black">3rd Player: </span>
            {tournament.thirdPlayer?.toUpperCase() || "Not Available"}
          </h1>
          <h1 className="text-[15px] text-center sm:text-2xl lg:text-[20px] font-bold font-sans mb-4">
            <span className="text-[20px] text-black">4th Player: </span>
            {tournament.fourthPlayer?.toUpperCase() || "Not Available"}
          </h1>
        </div>

        <h1 className="text-red-500 mt-6 text-center">
          {process.env.NEXT_PUBLIC_MATCH_PASSWORD === "" ? (
            <span>
              You will get Room ID & Password before 15 minutes of match
              starting time..
            </span>
          ) : (
            <span>
              <span>Room ID: {process.env.NEXT_PUBLIC_MATCH_ROOMID}</span>
              <br />
              <span>Password: {process.env.NEXT_PUBLIC_MATCH_PASSWORD}</span>
            </span>
          )}
        </h1>
      </div>
    </div>
  );
}
