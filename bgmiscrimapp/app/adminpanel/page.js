'use client';

import { useState } from "react";
import { SignedIn,UserButton ,useUser} from "@clerk/nextjs";

export default function DynamicFormUploader() {
  const  {user,isLoaded} = useUser();
  const [collection, setCollection] = useState("");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("");

  const fieldTemplates = {
    tournament: ["id","name", "startdate", "enddate"],
    upcomingtournament: ["id","name", "startdate", "enddate"],
    tournamentdetail: ["id","name", "startdate", "enddate", "map", "prizePool"],
    upcomingscrim: ["name", "startdate", "time", "match"],
    mvpplayer: ["name", "teamname", "kill", "imgSrc"],
    topplayer: ["rank", "playerName", "kill", "teamName", "point", "imgSrc"],
    rank: ["rank", "playerName", "kill", "teamName", "point"],
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
      const response = await fetch("http://localhost:5000/tournament", {
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

  return (
    <>
    <div className="mt-5 bg-gray-500 w-[90%] h-10 rounded-2xl">
      <SignedIn>
        <div className="flex p-2  ">
        <UserButton/>
          <div className="font-black mx-2">
            <h1>Welcome, {user?.username }</h1>
          </div>
        </div>
      </SignedIn>
    </div>
    <div className="border-2 border-amber-50 w-[600px] p-4 rounded-2xl mx-20 my-4">
      <h2 className="text-2xl font-bold p-4">📤 Upload Tournment detail in to MongoDB</h2>

      <form onSubmit={handleSubmit}>
        <label className="text-amber-200">Select Collection:</label>
        <select
        className="border-1 border-amber-50 m-2 rounded-2xl"
          value={collection}
          onChange={(e) => {
            setCollection(e.target.value);
            setFormData({});
            setStatus("");
          }}
          required
        >
          <option   className="text-amber-200" value="">-- Select --</option>
          {Object.keys(fieldTemplates).map((col) => (
            <option  className="text-black font-bold" key={col} value={col}>{col}</option>
          ))}
        </select>

        <br /><br />

        {currentFields.map((field) => (
          <div key={field} style={{ marginBottom: "1rem" }}>
            <label>{field}:</label>
            <input 
            className="border-1 border-amber-50 rounded-2xl"
              type="text"
              value={formData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              required
              style={{ display: "block", padding: "0.5rem", width: "100%", marginTop: "0.25rem" }}
            />
          </div>
        ))}

       <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
Submit
</span>
</button>
      </form>

      <p style={{ marginTop: "1rem", color: status.startsWith("✅") ? "green" : "red" }}>
        {status}
      </p>
    </div>
    </>
  );
}
