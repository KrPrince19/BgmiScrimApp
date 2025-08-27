// app/details/[id]/page.jsx

"use client"
import { useParams } from "next/navigation";
import { tournamentDetail } from "../../admin/admin";


export default function DetailPage() {
  const params = useParams(); // Retrieves { id }
  const tournament = tournamentDetail.find((t) => t.id === params.id);

  if (!tournament) {
    return <p className="text-cyan-400 text-4xl text-center mt-8">Tournament Details not found...?</p>;
  }

  return (
    <div className=" bg-gray-900 h-40 p-4 text-white">
      <h1 className="text-2xl font-bold mx-30 font-sans">{tournament.name.toUpperCase()}</h1>
      <ul className="mt-4 flex gap-5 ">
        <li>
          <strong  className="text-2xl text-amber-300" >Start Date:</strong> <span className="text-[1.6rem]">{tournament.startdate}</span>
        </li>
        <li>
          <strong className="text-2xl text-amber-300 ">End Date:</strong> <span className="text-[1.6rem]">{tournament.enddate}</span>
        </li>
        <li>
          <strong className="text-2xl text-amber-300">Map:</strong> <span className="text-[1.6rem]"> {tournament.map}</span>
        </li>
        <li>
          <strong className="text-2xl text-amber-300">Prize Pool:</strong> <span className="text-[1.6rem]">{tournament.prizePool}</span>
        </li>
      </ul>
    </div>
  );
}
