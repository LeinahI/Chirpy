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
import { createChirp } from "@/lib/actions/chirp.actions";
import { fetchUser } from "@/lib/actions/user.actions";

interface Props {
  userId: string;
}

function PostChirp({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ChirpValidation>>({
    resolver: zodResolver(ChirpValidation),
    defaultValues: {
      chirp: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ChirpValidation>) => {
    console.log('ORG ID: ', organization)
    await createChirp({
      text: values.chirp,
      author: userId,
      circleId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-5 flex flex-col justify-start gap-10 rounded-lg bg-light-2 px-7 py-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='chirp'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl className='no-focus border border-primary-500 bg-light-2 text-dark-1'>
                <Textarea 
                rows={8} 
                {...field} 
                className="resize-none"
                placeholder={`Share your thoughts...`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500 hover:bg-secondary-500'>
          Post Chirp
        </Button>
      </form>
    </Form>
  );
}

export default PostChirp;