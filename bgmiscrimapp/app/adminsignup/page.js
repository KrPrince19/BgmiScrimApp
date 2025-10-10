'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterAdmin() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    adminId: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.URL}/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      // success: redirect
      router.push('/admindashboard');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl mb-4">Admin SignUp</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            name="adminId"
            placeholder="Admin ID"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Register
            </button>
            <button
              type="reset"
              className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/adminlogin" className="underline font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
