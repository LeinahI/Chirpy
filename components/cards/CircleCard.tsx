import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CircleCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="circle-card">
      <div className="flex flex-col items-center gap-3 ">
        <Link href={`/circles/${id}`} className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="circle_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          <Link href={`/circles/${id}`}>
            <h4 className="text-base-semibold text-light-1">{name}</h4>
          </Link>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>

        {/* <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p> */}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/circles/${id}`}>
          <Button size="sm" className="circle-card_btn">
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full relative h-[28px] w-[28px] object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CircleCard;
