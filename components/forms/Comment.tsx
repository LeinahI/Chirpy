"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/chirp";
import Image from "next/image";
import { addCommentToChirp } from "@/lib/actions/chirp.actions";

/* Emoji */
import { CiFaceSmile } from "react-icons/ci";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState, useEffect, useRef } from "react";

interface Props {
  chirpId: string;
  currentUserId: string;
  currentUserImg: string;
}

const Comment = ({ chirpId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const emojiPickerRef = useRef<HTMLDivElement | null>(null); // Explicitly provide the type

  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      chirp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToChirp(
      chirpId,
      values.chirp,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  const [showEmoji, setShowEmoji] = useState(false);
  const addEmoji = (e: { unified: string }) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = sym.map((el) => parseInt(el, 16));
    let emoji = String.fromCodePoint(...codeArray);
    form.setValue("chirp", form.getValues("chirp") + emoji);
  };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="chirp"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  height={44}
                  width={44}
                  className="relative h-[44px] w-[44px] object-cover rounded-full"
                />
              </FormLabel>
              <div className=" flex w-full items-end relative border border-primary-500 rounded-lg">
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    className="no-focus text-dark-1"
                    placeholder="Share your thoughts..."
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <span
                  className="pr-2 py-3 cursor-pointer hover:text-primary-500"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <CiFaceSmile />
                </span>

                {showEmoji && (
                  <div
                    className="absolute top-[100%] right-2"
                    ref={emojiPickerRef}
                  >
                    <Picker
                      data={data}
                      emojiSize={20}
                      emojiButtonSize={28}
                      onEmojiSelect={addEmoji}
                      maxFrequentRows={0}
                      theme="light"
                    />
                  </div>
                )}
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
