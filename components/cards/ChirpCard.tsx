import Image from "next/image";
import Link from "next/link";

import { formatDateString, formatTimeString } from "@/lib/utils";
import DeleteChirp from "../forms/DeleteChirp";
import EditChirp from "../atoms/EditChirp";
import ReactChirp from "../atoms/ReactChirp";

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
  reactions: {
    image: string;
    _id: string;
    id: string;
    name: string;
    username: string;
  }[];
  isComment?: boolean;
  reactState?: boolean;
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
  reactions,
  isComment,
  reactState,
}: Props) => (
  <article
    className={`flex w-full flex-col rounded-xl ${
      isComment ? "px-0 xs:px-7" : "bg-light-2 p-7"
    }`}
  >
    <div className={`flex items-start justify-between`}>
      <div className="flex w-full flex-1 flex-row gap-4">
        <div className="flex flex-col items-center">
          {/* Show Profile Icon if not in circle  */}
          {!circle && (
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer object-cover rounded-full"
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
                  alt={circle.image}
                  fill
                  className="relative h-[44px] w-[44px] rounded-lg object-cover shawdow-2xl"
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
                  className="relative h-[25px] w-[25px] object-cover cursor-pointer rounded-full"
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
                <h4 className="cursor-pointer text-base-semibold text-dark-1">
                  {author.name}
                </h4>
              </Link>

              <div className="flex items-center">
                <Link href={`/profile/${author.id}`} className="w-fit">
                  <p className="text-subtle-medium text-gray-1">
                    @{author.username}
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
                <h4 className="cursor-pointer text-base-semibold text-dark-1">
                  {circle && `${circle.name}`}
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
          <p className="mt-2 text-small-regular text-dark-1">{content}</p>

          {/* Clickable icons */}
          <div className={`${isComment && "mb-5"} mt-5 flex flex-col gap-3`}>
            <div className="flex gap-3.5">
              <ReactChirp
                chirpId={id}
                currentUserId={currentUserId}
                interactState={reactState}
                parentId={parentId}
                isComment={isComment}
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
            </div>
            {/* Line 118 sa ThreadCard */}
            <div className="flex flex-row gap-2">
              {isComment && (
                <>
                  {comments.length > 0 && (
                    <Link href={`/chirp/${id}`}>
                      <p className="mt-1 text-subtle-medium text-gray-1">
                        {comments.length}{" "}
                        {comments.length > 1 ? "replies" : "reply"}
                      </p>
                    </Link>
                  )}

                  {comments.length > 0 && reactions.length > 0 && (
                    <p className="mt-1 text-subtle-medium text-gray-1">•</p>
                  )}

                  {reactions.length > 0 && (
                    <Link href={`/chirp/reactions/${id}`}>
                      <p className="mt-1 text-subtle-medium text-gray-1">
                        {reactions.length}{" "}
                        {reactions.length > 1 ? "likes" : "like"}
                      </p>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Line 148 sa ThreadCard */}
      <div className="flex flex-row gap-2">
        <DeleteChirp
          chirpId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
        <EditChirp
          chirpId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
        />
      </div>
    </div>

    {/* Line 164 sa ThreadCard */}
    <div className="flex flex-row gap-2">
      {reactions.length > 0 && (
        <div className="ml-1 flex items-center gap-2">
          {reactions.slice(0, 2).map((reaction, index) => (
            <Image
              key={index}
              src={reaction.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${
                index !== 0 && "-ml-5"
              } rounded-full h-[24px] w-[24px] object-cover`}
            />
          ))}

          <Link href={`/chirp/reactions/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {reactions.length} {reactions.length > 1 ? "likes" : "like"}
            </p>
          </Link>
        </div>
      )}
    </div>
  </article>
);

export default ChirpCard;
