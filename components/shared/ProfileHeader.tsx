import Image from "next/image";
import Link from "next/link";
import FollowUser from "../atoms/FollowUser"; /* new */

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  isFollowing?: boolean; /* new */
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  isFollowing, /* new */
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start rounded-lg bg-light-2 px-7 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile Image"
              fill
              className="rounded-full object-cover shawdow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-dark-1">{name}</h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
        {/* Edit your profile & Follow user*/}
        {type !== "Circle" && (
          <div className="flex flex-row gap-2">
            <>
              {accountId === authUserId ? (
                <Link href="/profile/edit">
                  <div className="flex cursor-pointer gap-3 rounded-lg bg-primary-500 hover:bg-secondary-500 px-4 py-2">
                    <Image
                      src="/assets/edit.svg"
                      alt="logout"
                      width={16}
                      height={16}
                    />

                    <p className="text-light-1 max-sm:hidden">Edit</p>
                  </div>
                </Link>
              ) : ( 
                <FollowUser /* new */
                  userId={accountId}
                  currentUserId={authUserId}
                  isFollowing={isFollowing}
                />
              )}
            </>
          </div>
        )}
      </div>

      {/* TODO: Circle */}
      <p className="mt-6 max-w-lg text-base-regular text-dark-1">{bio}</p>
    </div>
  );
};

export default ProfileHeader;
