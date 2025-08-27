import Image from "next/image";
import { tournamentName } from './admin/admin'; // or './admin/constants'
import Link from "next/link";


export default function Home() {
  return (
 <>
 <h1  className='h-10 font-bold text-yellow-500 underline'
         >ONGOING TURNAMENT</h1>
    <div className='overflow-auto scrollbar-hide'>
    <div className="container flex flex-col w-full h-[80vh] gap-3.5 py-4 ">
      {tournamentName.map((tournament, idx) => (
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
            <div >
               <div className="detail  mt-12 ">
              <Link  className="text-black" href={`/details/${tournament.id}`}>
            <button className="text-yellow-300  hover:underline  hover:text-cyan-400">DETAILS</button>
          </Link>
            </div>
    </div>
          </div>
        </div>
      ))}
    </div>
     </div></>
  );
}
