import { UserProfileClient } from "./user-profile-client";

export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  return <UserProfileClient username={username} />;
}
