import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCircles } from "@/lib/actions/circle.actions";

import SearchbarCircles from "@/components/shared/SearchBarCircles";
import Pagination from "@/components/shared/Pagination";
import CircleCard from "@/components/cards/CircleCard";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCircles({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <section>
        <h1 className="head-text mb-10">Search</h1>

        <div className="mt-5">
          <SearchbarCircles routeType="circles" />
        </div>

        <div className="mt-9 flex flex-wrap gap-9 ">
          {result.circles.length === 0 ? (
            <p className="no-result">No circles exists yet</p>
          ) : (
            <>
              {result.circles.map((circle) => (
                <CircleCard
                  key={circle.id}
                  id={circle.id}
                  name={circle.name}
                  username={circle.username}
                  imgUrl={circle.image}
                  bio={circle.bio}
                  members={circle.members}
                />
              ))}
            </>
          )}
        </div>
      </section>

      <Pagination
        path="circles"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Page;
