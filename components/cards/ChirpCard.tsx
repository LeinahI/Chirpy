import Image from "next/image";
import Link from "next/link";

import { formatDateString, formatTimeString } from "@/lib/utils";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    username: string;
    image: string;
    id: string;
  };
  circle: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ChirpCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  circle,
  createdAt,
  comments,
  isComment,
}: Props) => (
  <article
    className={`flex w-full flex-col rounded-xl ${
      isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
    }`}
  >
    <div className="flex items-start justify-between">
      <div className="flex w-full flex-1 flex-row gap-4">
        <div className="flex flex-col items-center">
          {/* Show Profile Icon if not in circle  */}
          {!circle && (
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
          )}

          {/* Show circle icon and user icon */}
          {!isComment && circle && (
            <>
              <Link
                href={`/circles/${circle.id}`}
                className="relative h-11 w-11"
              >
                <Image
                  src={circle.image}
                  alt={circle.name}
                  width={44}
                  height={44}
                  className="cursor-pointer rounded-lg"
                />
              </Link>
              <Link
                href={`/profile/${author.id}`}
                className="relative bottom-5 left-3"
              >
                <Image
                  src={author.image}
                  alt="Profile image"
                  height={25}
                  width={25}
                  className=" cursor-pointer rounded-full"
                />
              </Link>
            </>
          )}

          {/* Show card bar in comment section */}
          {isComment && <div className="chirp-card_bar" />}
        </div>

        <div className="flex flex-col">
          {/* Show Profile name if not in circle  */}
          {!circle && (
            <>
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>

              <div className="flex items-center">
                <Link href={`/profile/${author.id}`} className="w-fit">
                  <p className="text-subtle-medium text-gray-1">
                    {author.username}
                  </p>
                </Link>
                <span className="text-subtle-medium text-gray-1">
                  &nbsp;•&nbsp;
                </span>
                <Link
                  href={`/chirp/${id}`}
                  className="text-subtle-medium text-gray-1"
                  title={formatDateString(createdAt)}
                >
                  {formatTimeString(createdAt)}
                </Link>
              </div>
            </>
          )}

          {/* show circle name and user who post */}
          {circle && (
            <>
              <Link href={`/circles/${circle.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {circle.name}
                </h4>
              </Link>

              <div className="flex items-center">
                <Link href={`/profile/${author.id}`} className="w-fit">
                  <p className="text-subtle-medium text-gray-1">
                    {author.name}&nbsp;&nbsp;
                    <span className="text-gray-1">@{author.username}</span>
                  </p>
                </Link>
                <span className="text-subtle-medium text-gray-1">
                  &nbsp;•&nbsp;
                </span>
                <Link
                  href={`/chirp/${id}`}
                  className="text-subtle-medium text-gray-1"
                  title={formatDateString(createdAt)}
                >
                  {formatTimeString(createdAt)}
                </Link>
              </div>
            </>
          )}

          {/* The User Post */}
          <p className="mt-2 text-small-regular text-light-2">{content}</p>

          <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
            <div className="flex gap-3.5">
              <Image
                src="/assets/heart-gray.svg"
                alt="like"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
              <Link href={`/chirp/${id}`}>
                <Image
                  src="/assets/reply.svg"
                  alt="reply"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </Link>
              <Image
                src="/assets/repost.svg"
                alt="repost"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
              <Image
                src="/assets/share.svg"
                alt="share"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
            </div>

            <div className="flex items-center">
              {!isComment && comments.length > 0 && (
                <>
                  <div className="ml-1 flex items-center gap-2">
                    {comments.slice(0, 2).map((comment, index) => (
                      <Image
                        key={index}
                        src={comment.author.image}
                        alt={`user_${index}`}
                        width={24}
                        height={24}
                        className={`${
                          index !== 0 && "-ml-5"
                        } rounded-full object-cover`}
                      />
                    ))}

                    <Link href={`/chirp/${id}`}>
                      <p className="text-subtle-medium text-gray-1">
                        {comments.length} repl
                        {comments.length > 1 ? "ies" : "y"}
                      </p>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* {!isComment && circle && (
      <Link href={`/circles/${circle.id}`} className="mt-5 flex items-center">
        <p className="text-subtle-medium text-gray-1">
          {formatDateString(createdAt)}
          {circle && ` • ${circle.name} Circle`}
        </p>

        <Image
          src={circle.image}
          alt={circle.name}
          width={14}
          height={14}
          className="ml-1 rounded-full object-cover"
        />
      </Link>
    )} */}
  </article>
);

export default ChirpCard;
