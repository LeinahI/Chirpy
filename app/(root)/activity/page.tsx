import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { formatDateWithMeasure, truncateString } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
/* import Link from "next/link"; */
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
const DynamicLink = dynamic(() => import("next/link"), { ssr: false });

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <DynamicLink
                key={activity._id}
                href={`${
                  (activity.parentId && `/chirp/${activity.parentId}`) ||
                  `/profile/${activity.author.id}`
                }`}
              >
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <ActivityComponent
                    author={activity.author}
                    createdAt={activity.createdAt}
                    parentId={activity.parentId}
                    activityType={activity.activityType}
                    text={activity.text}
                  />
                </article>
              </DynamicLink>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-dark-1">
            No activity existing yet
          </p>
        )}
      </section>
    </>
  );
}

const ActivityComponent = ({ author, createdAt, activityType, text }: any) => (
  <p className="!text-small-regular text-dark-1">
    <DynamicLink key={author._id} href={`/profile/${author.id}`}>
      <span className="text-primary-500">{author.name}</span>
    </DynamicLink>{" "}
    <>
      {activityType === "follow" && "followed you"} 
      {activityType === "reaction" && "liked your chirp"}
      {/* NEW */}
      {text && `replied to your chirp: "${truncateString(text, 15)}"`}
    </>{" "}
    <span className="text-gray-1">~ {formatDateWithMeasure(createdAt)}</span>
  </p>
);

export default Page;
