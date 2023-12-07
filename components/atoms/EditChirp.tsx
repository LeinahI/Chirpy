import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  chirpId: string;
  currentUserId: string;
  authorId: string;
}

const EditChirp = ({ chirpId, currentUserId, authorId }: Props) => { /* NEW */
  if (currentUserId !== authorId) return null;

  return (
    <Link href={`/edit-chirp/${JSON.parse(chirpId)}`}>
      <Image
        src="/assets/edit-yl.svg"
        alt="edit chirp"
        width={18}
        height={18}
        className="cursor-pointer object-contain"
      />
    </Link>
  );
};

export default EditChirp;
