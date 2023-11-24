import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ChirpCard from "../cards/ChirpCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ChirpsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  /* TODO: Fetch profile chirps */
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.chirps.map((chirp: any) => (
        <ChirpCard
          key={chirp._id}
          id={chirp._id}
          currentUserId={currentUserId}
          parentId={chirp.parentId}
          content={chirp.text}
          author={
            accountType === "User"
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                }
              : {
                  name: chirp.author.name,
                  image: chirp.author.image,
                  id: chirp.author.id,
                }
          }
          circle={chirp.circle} //todo
          createdAt={chirp.createdAt}
          comments={chirp.children}
        />
      ))}
    </section>
  );
};

export default ChirpsTab;
