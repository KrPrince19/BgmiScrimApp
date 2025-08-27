import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/admin/login');
  }

  const user = await currentUser();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👑 Welcome Admin</h1>
      <p>Logged in as: {user?.emailAddresses[0]?.emailAddress}</p>
      <p>You now have access to the admin panel.</p>
    </div>
  );
}
