"use client"
import { UserProfileClient } from "./user-profile-client";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const params = useParams<{ slug: string }>();
  return <UserProfileClient username={params.slug} />;
}
