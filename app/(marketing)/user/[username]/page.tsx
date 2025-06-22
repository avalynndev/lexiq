import { UserProfileClient } from "./user-profile-client";
import { useParams } from "next/navigation";

export default async function UserProfilePage() {
  const params = useParams<{ slug: string }>();
  return <UserProfileClient username={params.slug} />;
}
