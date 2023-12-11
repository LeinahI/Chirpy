import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ChirpCard from "@/components/cards/ChirpCard";

import { fetchUser } from "@/lib/actions/user.actions";
import {
  fetchChirpById,
  getReactedUsersByChirp,
  isChirpReactedByUser,
} from "@/lib/actions/chirp.actions";
import UserCard from "@/components/cards/UserCard";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const chirp = await fetchChirpById(params.id);

  const reactions = await getReactedUsersByChirp(chirp._id);

  const reactionState = await isChirpReactedByUser({
    chirpId: chirp._id,
    userId: userInfo._id,
  });

  return (
    <section className="relative">
      <div>
        <ChirpCard
          id={chirp._id}
          currentUserId={user.id}
          parentId={chirp.parentId}
          content={chirp.text}
          author={chirp.author}
          circle={chirp.circle}
          createdAt={chirp.createdAt}
          comments={chirp.children}
          reactions={reactions.users}
          reactState={reactionState}
        />
      </div>

      <div className="mt-7">
        <Comment
          chirpId={params.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-5">
        {chirp.reactionsCount === 1 ? (
          <h1 className="head-text mb-5">People who like this chirp</h1>
        ) : (
          <h1 className="head-text mb-5">People who likes this chirp</h1>
        )}
        {chirp.reactionsCount === 0 ? (
          <p className="no-result">No users found</p>
        ) : (
          <>
            {reactions.users.map((reaction: any) => (
              <div className="search-card mt-5">
                <UserCard
                  key={reaction._id}
                  id={reaction.id}
                  name={reaction.name}
                  username={reaction.username}
                  imgUrl={reaction.image}
                  personType="User"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default page;
