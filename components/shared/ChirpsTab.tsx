import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ChirpCard from "../cards/ChirpCard";
import { fetchCircleChirps } from "@/lib/actions/circle.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ChirpsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  try {
    let result: any;

    if (accountType === "Circle") {
      result = await fetchCircleChirps(accountId);
    } else {
      result = await fetchUserPosts(accountId);
    }

    // Handle the case where there is no result
    if (!result) {
      console.error("No result found. Redirecting to /");
      // Move redirect outside the try block
      redirect("/");
    }

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
