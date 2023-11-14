import * as z from "zod";

export const ChirpValidation = z.object({
  chirp: z.string().nonempty().min(1, { message: "Minimum at least 1 character." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
    chirp: z.string().nonempty().min(1, { message: "Minimum at least 1 character." }),
});
