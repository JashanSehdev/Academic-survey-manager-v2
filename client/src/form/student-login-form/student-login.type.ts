import z from "zod";

export const studentLoginSchema = z.object({
    card_id : z.string(),
    email : z.string()
})

export type StudentLoginInput = z.infer<typeof studentLoginSchema>