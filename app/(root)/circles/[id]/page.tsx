import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { circleTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ChirpsTab from "@/components/shared/ChirpsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "@/components/cards/UserCard";
import { fetchCircleDetails } from "@/lib/actions/circle.actions";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const circleDetails = await fetchCircleDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={circleDetails.id}
        authUserId={user.id}
        name={circleDetails.name}
        username={circleDetails.username}
        imgUrl={circleDetails.image}
        bio={circleDetails.bi} //add 's' if you want to see bio
        type="Circle"
      />

      <div className="mt-9">
        <Tabs defaultValue="chirps" className="w-full">
          <TabsList className="tab">
            {circleTabs.map((tab) => (
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
                    {circleDetails?.chirps?.length}
                  </p>
                )}

                {tab.label === "Members" && (
                  <p className="ml-1 rounded-sm bg-light-2 px-2 py-1 !text-tiny-medium text-dark-1">
                    {circleDetails?.members?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Chirps */}
          <TabsContent value="chirps" className="w-full">
            {/*  shows the User Posts inside of circle */}

            {circleDetails?.chirps?.length === 0 ? (
              <div className="mt-9 flex flex-col gap-10">
                <p className="no-result text-dark-1">No chirps found</p>
              </div>
            ) : (
              <ChirpsTab
                currentUserId={user.id}
                accountId={circleDetails._id}
                accountType="Circle"
              />
            )}
          </TabsContent>

          {/* Members */}
          <TabsContent value="members" className="w-full text-dark-1 ">
            {/* shows members list */}
            <section className="mt-9 flex flex-col gap-5  ">
              {circleDetails.members.map((member: any) => (
                <div className="rounded-lg bg-light-2 px-7 py-4">
                  <UserCard
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    username={member.username}
                    imgUrl={member.image}
                    personType="User"
                  />
                </div>
              ))}
            </section>
          </TabsContent>

          {/* Requests */}
          {/* <TabsContent value="requests" className="w-full text-light-1">
            <ChirpsTab
              currentUserId={user.id}
              accountId={circleDetails.id}
              accountType="Circle"
            />
          </TabsContent> */}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
