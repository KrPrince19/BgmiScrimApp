

import { currentUser } from "@clerk/nextjs/server";
import UserDashboard from "./UserDashboard";

export default async function Page() {
  const user = await currentUser();

  // Extract user details
  const name = user?.username ?? "Guest";
  const userEmail = user?.emailAddresses?.[0]?.emailAddress ?? "";

  // Pass as separate props
  return <UserDashboard userEmail={userEmail} name={name} />;
}

