"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteChirp } from "@/lib/actions/chirp.actions";

interface Props {
  chirpId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function deleteChirps({
  chirpId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  const handleClick = async () => {
    await deleteChirp(JSON.parse(chirpId), pathname);
    if (!parentId || !isComment) {
      router.push("/");
    }
  };
  return (
    <Image
      src="/assets/delete.svg"
      alt="delte"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  );
}

export default deleteChirps;
