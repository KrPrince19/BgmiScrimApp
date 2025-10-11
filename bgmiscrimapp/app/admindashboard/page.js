'use client';

import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function DynamicFormUploader() {
   const router = useRouter();
  const [collection, setCollection] = useState("");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("");
    const [error, setError] = useState(null);


   const [admin, setupAdmins] = useState([]);
      const [loading, setLoading] = useState(true);

  const fieldTemplates = {
    tournament: ["tournamentId","name", "startdate", "enddate"],
    upcomingtournament: ["tournamentId","name", "startdate", "enddate"],
    tournamentdetail: ["tournamentId","name", "startdate", "enddate", "map", "prizePool"],
    upcomingscrim: ["name", "startdate", "time", "match"],
    mvpplayer: ["name", "teamname", "kill", "imgSrc"],
    topplayer: ["rank", "playerName", "kill", "teamName", "point", "imgSrc"],
    rank: ["rank", "playerName", "kill", "teamName", "point"],
  };

  //logoutfunction
      const handleLogout = async (email) => {
        
    try {
      await fetch(`${process.env.URL}/logoutadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Optionally send email or token to identify admin
        body: JSON.stringify({ email }), 
      });

      // Redirect to login page
      router.push('/home');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collection) {
      setStatus("❌ Please select a collection.");
      return;
    }

    try {
      const response = await fetch("https://bgmibackend.onrender.com/tournament", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, data: [formData] }),
      });

      if (!response.ok) throw new Error("Failed to upload");

      setStatus("✅ Data uploaded successfully!");

      const cleared = {};
      fieldTemplates[collection].forEach((field) => (cleared[field] = ""));
      setFormData(cleared);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setStatus("❌ Upload failed.");
    }
  };

  const currentFields = fieldTemplates[collection] || [];


  
     useEffect(() => {
           const fetchAdmin = async () => {
             try {
               const res = await fetch(`http://localhost:5000/admins`);
               if (!res.ok) throw new Error(`❌ Server responded with ${res.status}`);
               const data = await res.json();
              setupAdmins(data);
             } catch (err) {
               console.error(err);
               setError("❌ Failed to fetch player.");
             } finally {
               setLoading(false);
             }
           };
       
           fetchAdmin();
         }, []);

  return (
    <>

{loading ? (
  <p className="text-white">Loading Admins data</p>
) : (
  <div className="px-4 -ml-6 sm:px-8">
    {admin.map((admindata, idx) => (
      <div
        key={idx}
        className="mt-20 bg-white shadow-xl/30  w-full md:w-[500px] h-10 rounded-2xl flex items-center justify-between"
      >
        <div className="font-black mx-2">
          <h1>Welcome, {admindata.name}</h1>
        </div>
        <div className="-mt-1 rounded-2xl sm:mr-14">
          <button
            onClick={() => handleLogout(admindata.email)}
            className="bg-red-500 hover:bg-amber-100 hover:font-bold hover:text-blue-400 hover:cursor-pointer text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    ))}
  </div>
)}

<div className="border-2 border-amber-50 w-full h-[100vh] lg:w-[525px] p-4 rounded-2xl  my-4">
  <h2 className=" text-[13px] lg:text-2xl  font-bold p-4">📤 Upload Tournament detail in to MongoDB</h2>

  <form onSubmit={handleSubmit} className="px-2 sm:px-4">
    <label className="text-amber-200">Select Collection:</label>
    <select
      className="border border-amber-50 m-2 rounded-2xl w-full sm:w-auto"
      value={collection}
      onChange={(e) => {
        setCollection(e.target.value);
        setFormData({});
        setStatus("");
      }}
      required
    >
      <option className="text-amber-200" value="">
        -- Select --
      </option>
      {Object.keys(fieldTemplates).map((col) => (
        <option
          className="text-black font-bold"
          key={col}
          value={col}
        >
          {col}
        </option>
      ))}
    </select>

    <br />
    <br />

    {currentFields.map((field) => (
      <div key={field} className="mb-4">
        <label className="block">{field}:</label>
        <input
          className="border border-black rounded-2xl block w-full sm:w-full px-2 py-1 mt-1"
          type="text"
          value={formData[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          required
        />
      </div>
    ))}

    <button
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        Submit
      </span>
    </button>
  </form>

  <p
    className="mt-4"
    style={{
      color: status.startsWith("✅") ? "green" : "red",
    }}
  >
    {status}
  </p>
</div>

    </>
  );
}
