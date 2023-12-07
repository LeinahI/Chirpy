import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ChirpsTab from "@/components/shared/ChirpsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  fetchUser,
  fetchUsersByField,
  isUserFollowing,
} from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const followers = await fetchUsersByField(params.id, "followers");
  const following = await fetchUsersByField(params.id, "following");
  const isFollowing = await isUserFollowing(user.id, params.id);

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        isFollowing={isFollowing}
      />

      <div className="mt-9">
        <Tabs defaultValue="chirps" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Chirps" && (
                  <p className="ml-1 rounded-sm bg-light-2 px-2 py-1 !text-tiny-medium text-dark-1">
                    {userInfo?.chirps?.length}
                  </p>
                )}

                {tab.label === "Followers" && (
                  <p className="ml-1 rounded-sm bg-light-2 px-2 py-1 !text-tiny-medium text-dark-1">
                    {userInfo.followersCount}
                  </p>
                )}
                {tab.label === "Following" && (
                  <p className="ml-1 rounded-sm bg-light-2 px-2 py-1 !text-tiny-medium text-dark-1">
                    {userInfo.followingCount}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="chirps" className="w-full">
            {/*  shows the User Posts inside of circle */}

            {userInfo?.chirps?.length === 0 ? (
              <div className="mt-9 flex flex-col gap-10">
                <p className="no-result text-dark-1">No chirps found</p>
              </div>
            ) : (
              <ChirpsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            )}
          </TabsContent>

          <TabsContent value="followers" className="w-full">
            <div className="mt-9 flex flex-col gap-5">
              {userInfo.followersCount === 0 ? (
                <p className="no-result">No users found</p>
              ) : (
                <>
                  {followers.map((follower: any) => (
                    <div className="rounded-lg bg-light-2 px-7 py-4">
                      <UserCard
                        key={follower.id}
                        id={follower.id}
                        name={follower.name}
                        username={follower.username}
                        imgUrl={follower.image}
                        personType="User"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="following" className="w-full">
            <div className="mt-9 flex flex-col gap-5">
              {userInfo.followingCount === 0 ? (
                <p className="no-result">No users found</p>
              ) : (
                <>
                  {following.map((following: any) => (
                    <div className="rounded-lg bg-light-2 px-7 py-4">
                      <UserCard
                        key={following.id}
                        id={following.id}
                        name={following.name}
                        username={following.username}
                        imgUrl={following.image}
                        personType="User"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
export default Page;
