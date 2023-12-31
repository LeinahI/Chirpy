import ChirpCard from "@/components/cards/ChirpCard";
import Comment from "@/components/forms/Comment";
import { fetchChirpById, getReactionsData } from "@/lib/actions/chirp.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const chirpy = await fetchChirpById(params.id);

  const reactionsData = await getReactionsData({
    userId: userInfo._id,
    posts: chirpy.children,
    parentId: chirpy._id,
  });

  const {
    parentReactions,
    parentReactionState,
    childrenReactions,
    childrenReactionState,
  } = reactionsData;

  return (
    <section className="relative">
      <div>
        <ChirpCard
          key={chirpy._id}
          id={chirpy._id}
          currentUserId={user?.id || " "}
          parentId={chirpy.parentId}
          content={chirpy.text}
          author={chirpy.author}
          circle={chirpy.circle}
          createdAt={chirpy.createdAt}
          comments={chirpy.children}
          reactions={(parentReactions as { users: any[] }).users} // Type assertion here
          reactState={parentReactionState}
        />
      </div>

      <div className="mt-7">
        <Comment
          chirpId={chirpy.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {chirpy.children.map((childItem: any, idx: number) => (
          <ChirpCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            circle={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            reactions={childrenReactions[idx].users}
            reactState={childrenReactionState[idx]}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
