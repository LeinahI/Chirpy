"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { addReactToChirp } from "@/lib/actions/chirp.actions";

interface Props {
  chirpId: string;
  currentUserId: string;
  interactState?: boolean;
  isComment?: boolean;
  parentId?: string | null;
}

const ReactChirp = ({
  chirpId,
  currentUserId,
  interactState = false,
  isComment = false,
  parentId = null,
}: Props) => {
  const pathname = usePathname();

  const handleClick = async () => {
    await addReactToChirp({
      chirpId,
      userId: currentUserId,
      path: pathname,
    });
  };

  return (
    <Image
      src={`/assets/heart-${interactState ? "filled" : "stroke"}.svg`}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  );
};

export default ReactChirp;
