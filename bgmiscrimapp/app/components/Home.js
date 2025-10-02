
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// const Page = () => {
//   const [tournaments, setTournaments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTournaments = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/tournament`);
//         if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
//         const data = await res.json();
//         setTournaments(data);
//       } catch (err) {
//         console.error(err);
//         setError('❌ Failed to fetch tournaments.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTournaments();
//   }, []);

  

//   return (
//     <>
//       <h1 className='h-10 mt-[40%] font-bold text-yellow-500 underline text-center text-2xl'>
//         ONGOING TOURNAMENT
//       </h1>


//       <div className='overflow-auto scrollbar-hide  my-[50%] '>
//         {loading ? (
//           <p className="text-white">Loading tournaments...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           <div className="container flex flex-col w-[97%] h-[80vh] gap-3.5 py-4">
//             {tournaments.map((tournament) => (
//               <div
//                 key={tournament.tournamentId}
//                 className="card w-full bg-gray-900 p-2 -mt-2 h-auto flex justify-between items-start rounded-t-2xl border-r-1 border-l-1 border-yellow-200"
//               >
//                 <div className="left mx-22">
//                   <Link className="text-black" href={`/details/${tournament.tournamentId}`}>
//                     <div className="card-title text-white text-twire-light hover:underline hover:text-cyan-400 font-sans font-bold text-2xl mb-4">
//                       {tournament.name.toUpperCase()}
//                     </div>
//                   </Link>

//                   <div className="start-date flex gap-10 pt-4 text-amber-300 mb-2">
//                     <div>
//                       <h1 className="text-sm font-semibold">START DATE:-</h1>
//                       <span className="text-white">{tournament.startdate}</span>
//                     </div>
//                     <div>
//                       <h1 className="text-sm font-semibold">END DATE:-</h1>
//                       <span className="text-white">{tournament.enddate}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="right">
//                   <div className="detail mt-12">
//                     <Link className="text-black" href={`/joinmatch/${tournament.tournamentId}`}>
//                       <button className="text-yellow-300 hover:underline hover:text-cyan-400">JOIN</button>
//                     </Link>
//                   </div>
//                   <div className="detail mt-2">
//                     <Link className="text-black" href={`/details/${tournament.tournamentId}`}>
//                       <button className="text-yellow-300 hover:underline hover:text-cyan-400">DETAILS</button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Page;


