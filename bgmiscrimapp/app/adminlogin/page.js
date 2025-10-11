'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await  fetch('https://bgmibackend.onrender.com/adminlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Optional: pass admin info via query or context
      router.push('/admindashboard'); // redirect on success
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to server');
    }
  };

  return (
<div className="w-full  h-[100vh] my-20 mr-4 flex ">
  <div className="w-98 bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-center text-2xl font-semibold mb-6">Admin LogIn</h2>
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        required
      />

      <input
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
      />

      <button
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
}
