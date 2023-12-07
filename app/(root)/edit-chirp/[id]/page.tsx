import PostChirp from "@/components/forms/PostChirp";
import { fetchChirpById } from "@/lib/actions/chirp.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
/* NEW */
const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const chirp = await fetchChirpById(params.id);

  return (
    <>
      <h1 className="head-text">Edit Chirp</h1>

      <PostChirp
        userId={userInfo._id}
        chirpId={chirp.id}
        chirpText={chirp.text}
      />
    </>
  );
};

export default Page;
