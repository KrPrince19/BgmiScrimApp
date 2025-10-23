"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailPage() {
  const params = useParams(); // get { id } from URL
  const [tournamentDetail, setTournamentDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
              const res = await fetch('https://bgmibackend.onrender.com/tournamentdetail');;

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setTournamentDetail(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tournament data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
  }, []);

  const tournament = tournamentDetail.find(
    (t) => String(t.tournamentId).trim() === String(params.id).trim()
  );

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }
  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }
  if (!tournament) {
    return <p className="text-center mt-8 text-red-500">Tournament not found.</p>;
  }

  return (
    <div className="px-4 h-[100vh] py-8 sm:px-6 lg:px-12">
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 text-black max-w-4xl my-10 mr-4">
        <h1 className="text-xl sm:text-2xl text-cyan-400 lg:text-3xl font-bold mb-4 text-center">
          {tournament.name.toUpperCase()}
        </h1>
        <ul className="space-y-4 md:space-y-6">
          <li className="flex md:items-center gap-2">
            <strong className="text-lg md:text-xl text-black w-32">Start Date:</strong>
            <span className="text-lg font-bold md:text-xl">{tournament.startdate}</span>
          </li>
          <li className="flex  md:items-center gap-2">
            <strong className="text-lg md:text-xl text-black w-32">End Date:</strong>
            <span className="text-lg  font-bold md:text-xl">{tournament.enddate}</span>
          </li>
          <li className="flex md:items-center gap-2">
            <strong className="text-lg md:text-xl text-black w-32">Map:</strong>
            <span className="text-lg  font-bold md:text-xl">{tournament.map}</span>
          </li>
          <li className="flex  md:items-center gap-2">
            <strong className="text-lg md:text-xl text-black w-32">Prize Pool:</strong>
            <span className="text-lg font-bold md:text-xl">{tournament.prizePool}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
