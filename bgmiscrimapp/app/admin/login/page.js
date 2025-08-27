'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignInButton, SignUpButton, SignedOut ,UserButton} from '@clerk/nextjs';

export default function AdminLoginPage() {
  const [adminInput, setAdminInput] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const { isSignedIn } = useUser(); // ✅ Detect signed in status
  const router = useRouter();

  const checkAdminID = () => {
    if (adminInput === process.env.NEXT_PUBLIC_ADMIN_ID) {
      setVerified(true);
      setError('');
    } else {
      setError('❌ Invalid Admin ID');
    }
  };

  // ✅ If user is signed in and admin ID is verified, redirect to /adminpanel
  useEffect(() => {
    if (isSignedIn && verified) {
      router.push('/adminpanel');
    }
  }, [isSignedIn, verified, router]);

  return (
    <>
    <div className=' mx-7 border-2 border-amber-50 rounded-2xl w-[90%] h-[30vh] flex flex-col justify-center '>
      {!verified ? (
        <>
          <h1 className='text-center w-[full] h '>🔐 Enter Admin ID</h1>
          <input
          className='border-1 border-amber-50 rounded-lg'
            type="password"
            value={adminInput}
            onChange={(e) => setAdminInput(e.target.value)}
            placeholder="Enter Admin ID"
            style={{ padding: '0.5rem', margin: '1rem' }}
          />
          <br />
          <button onClick={checkAdminID}>Verify</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      ) : (
        <>
          <h2>✅ Admin ID Verified</h2>
          <SignedOut>
            <SignInButton mode="modal" redirectUrl="/adminpanel" />
            <SignUpButton mode="modal" redirectUrl="/adminpanel" />
          </SignedOut>
        </>
      )}
    </div>
    <div className='note'>
        <span className='text-center w-[90%] mx-20 my-4 font-light text-blue-50 ' >Note:-Contact the Develpoer for ID...</span>
    </div>
    </>
  );
}
