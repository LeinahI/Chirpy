import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ChirpCard from "../cards/ChirpCard";
import { fetchCircleChirps } from "@/lib/actions/circle.actions";
import { currentUser } from "@clerk/nextjs";
import { getReactionsData } from "@/lib/actions/chirp.actions";

interface Result {
  name: string;
  image: string;
  username: string;
  id: string;
  chirps: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      username: string;
      name: string;
      image: string;
      id: string;
    };
    circle: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ChirpsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  try {
    let result: Result;

    if (accountType === "Circle") {
      result = await fetchCircleChirps(accountId);
    } else {
      result = await fetchUserPosts(accountId);
    }

    if (!result) {
      redirect("/");
    }

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
      <section className="mt-9 flex flex-col gap-10">
        {result.chirps.map((chirp, idx) => (
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
                    username: result.username,
                    image: result.image,
                    id: result.id,
                  }
                : {
                    name: chirp.author.name,
                    image: chirp.author.image,
                    username: chirp.author.username,
                    id: chirp.author.id,
                  }
            }
            circle={
              accountType === "Circle"
                ? {
                    name: result.name,
                    id: result.id,
                    image: result.image,
                  }
                : chirp.circle
            }
            createdAt={chirp.createdAt}
            comments={chirp.children}
            reactions={childrenReactions[idx].users}
            reactState={childrenReactionState[idx]}
          />
        ))}
      </section>
    );
  } catch (err: any) {
    console.error("Error fetching chirps: ", err);
    // You might want to handle the error differently or log it
  }
};

export default ChirpsTab;
