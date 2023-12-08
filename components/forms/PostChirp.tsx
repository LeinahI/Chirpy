"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ChirpValidation } from "@/lib/validations/chirp";
import { createChirp, editChirp } from "@/lib/actions/chirp.actions";
import { fetchUser } from "@/lib/actions/user.actions"; /* New */

/* Emoji */
import { CiFaceSmile } from "react-icons/ci";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

interface Props {
  userId: string;
  chirpId?: string /* New */;
  chirpText?: string /* New */;
}

function PostChirp({ userId, chirpId, chirpText }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ChirpValidation>>({
    resolver: zodResolver(ChirpValidation),
    defaultValues: {
      chirp: chirpText || "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ChirpValidation>) => {
    if (chirpId && chirpText) {
      await editChirp({
        chirpId,
        text: values.chirp,
        path: pathname,
      });
    } else {
      await createChirp({
        text: values.chirp,
        author: userId,
        circleId: organization ? organization.id : null,
        path: pathname,
      });
    }

    router.push("/");
  };
  /* Add emoji */
  const [showEmoji, setShowEmoji] = useState(false);
  const addEmoji = (e: { unified: string }) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = sym.map((el) => parseInt(el, 16));
    let emoji = String.fromCodePoint(...codeArray);
    form.setValue("chirp", form.getValues("chirp") + emoji);
  };

  return (
    <Form {...form}>
      <form
        className="mt-5 flex flex-col justify-start gap-10 rounded-lg bg-light-2 px-7 py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="chirp"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <div className="w-full flex items-end relative border border-primary-500 rounded-lg py-3 px-3">
                <FormControl className="no-focus border-none bg-transparent text-dark-1">
                  <Textarea
                    {...field}
                    rows={8}
                    className="resize-none scrollbar-thin scrollbar-thumb-primary-50"
                    placeholder={`Share your thoughts...`}
                  />
                </FormControl>
                <span
                  className="pl-2 cursor-pointer hover:text-primary-500"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <CiFaceSmile />
                </span>

                {showEmoji && (
                  <div className="absolute top-[100%] right-2">
                    <Picker
                      data={data}
                      emojiSize={20}
                      emojiButtonSize={28}
                      onEmojiSelect={addEmoji}
                      maxFrequentRows={0}
                    />
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500 hover:bg-secondary-500">
          {chirpId ? "Edit" : "Create"} Chirp
        </Button>
      </form>
    </Form>
  );
}

export default PostChirp;
