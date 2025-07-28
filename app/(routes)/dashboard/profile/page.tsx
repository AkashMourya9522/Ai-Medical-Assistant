

"use client";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex justify-center mt-8">
      <UserProfile />
    </div>
  );
}
