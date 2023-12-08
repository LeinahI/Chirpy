import ChirpCard from "@/components/cards/ChirpCard";
import { fetchChirps, getReactionsData } from "@/lib/actions/chirp.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetchChirps(1, 30);

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const reactionsData = await getReactionsData({
    userId: userInfo._id,
    posts: result.chirps,
  });

  const { childrenReactions, childrenReactionState } = reactionsData;

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-5 ">
        {result.chirps.length === 0 ? (
          <p className="no-result">No chirps found</p>
        ) : (
          <>
            {result.chirps.map((chirp, idx) => (
              <ChirpCard
                key={chirp._id}
                id={chirp._id}
                currentUserId={user?.id || " "}
                parentId={chirp.parentId}
                content={chirp.text}
                author={chirp.author}
                circle={chirp.circle}
                createdAt={chirp.createdAt}
                comments={chirp.children}
                reactions={childrenReactions[idx].users}
                reactState={childrenReactionState[idx]}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
