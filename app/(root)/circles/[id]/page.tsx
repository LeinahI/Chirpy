import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { circleTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ChirpsTab from "@/components/shared/ChirpsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCircleDetails } from "@/lib/actions/circle.actions";
import UserCard from "@/components/cards/UserCard";

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
        bio={circleDetails.bio}
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
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {circleDetails?.chirps?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="chirps" className="w-full text-light-1">
            {/*  shows the User Posts inside of circle */}
            <ChirpsTab
              currentUserId={user.id}
              accountId={circleDetails._id}
              accountType="Circle"
            />
          </TabsContent>

          <TabsContent value="members" className="w-full text-light-1">
            {/* shows members list */}
            <section className="mt-9 flex flex-col gap-10">
              {circleDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value="requests" className="w-full text-light-1">
            {/* Shows members request */}
            <ChirpsTab
              currentUserId={user.id}
              accountId={circleDetails.id}
              accountType="Circle"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
