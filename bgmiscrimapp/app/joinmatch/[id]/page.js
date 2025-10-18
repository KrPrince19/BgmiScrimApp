"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    tournamentName: "",
    firstPlayer: "",
    secondPlayer: "",
    thirdPlayer: "",
    fourthPlayer: "",
    playerEmail: "",
    playerPassword: "",
    playerConfirmPassword: "",
    playerMobileNumber: "",
  });

  useEffect(() => {
    if (params.id) {
      setForm((prev) => ({
        ...prev,
        tournamentName: params.id.toUpperCase(),
      }));
    }
  }, [params]);

  const handleReset = () => {
    setForm({
      tournamentName: params.id ? params.id.toUpperCase() : "",
      firstPlayer: "",
      secondPlayer: "",
      thirdPlayer: "",
      fourthPlayer: "",
      playerEmail: "",
      playerPassword: "",
      playerConfirmPassword: "",
      playerMobileNumber: "",
    });
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "playerMobileNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.playerPassword !== form.playerConfirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    if (form.playerMobileNumber.length !== 10) {
      setError("❌ Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://bgmibackend.onrender.com/joinmatches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "❌ Something went wrong");
        return;
      }

      setSuccess("✅ Joined successfully! 🎉");
      handleReset();
    } catch (err) {
      console.error("Fetch error:", err);
      setError("❌ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-22 sm:px-6 lg:px-8">
      <h1 className="font-bold text-2xl text-center mb-6">JOIN FORM</h1>

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-5 text-center border border-amber-100 rounded-2xl p-3">
          <span className="block mb-2 text-sm font-bold text-gray-700">
            You are joining tournament
          </span>
          <input
            type="text"
            name="tournamentName"
            value={form.tournamentName}
            readOnly
            className="text-center font-bold text-xl rounded-lg block w-full bg-gray-100"
          />
        </div>

        <Input label="First Player Name" name="firstPlayer" value={form.firstPlayer} onChange={handleChange} />
        <Input label="Second Player Name" name="secondPlayer" value={form.secondPlayer} onChange={handleChange} />
        <Input label="Third Player Name" name="thirdPlayer" value={form.thirdPlayer} onChange={handleChange} />
        <Input label="Fourth Player Name" name="fourthPlayer" value={form.fourthPlayer} onChange={handleChange} />
        <Input label="Email" name="playerEmail" type="email" value={form.playerEmail} onChange={handleChange} />
        <Input label="Password" name="playerPassword" type="password" value={form.playerPassword} onChange={handleChange} />
        <Input label="Repeat Password" name="playerConfirmPassword" type="password" value={form.playerConfirmPassword} onChange={handleChange} />
        <Input label="Phone Number" name="playerMobileNumber" value={form.playerMobileNumber} onChange={handleChange} inputMode="numeric" pattern="[0-9]*" />

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" required className="w-4 h-4 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-700">
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms and conditions
            </a>
          </label>
        </div>

        {error && <div className="text-red-500 mb-3 text-sm font-medium">{error}</div>}
        {success && <div className="text-green-600 mb-3 text-sm font-medium">{success}</div>}

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto text-white ${
              loading ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-800"
            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="reset"
            className="w-full sm:w-auto text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      {...rest}
    />
  </div>
);

export default Page;
