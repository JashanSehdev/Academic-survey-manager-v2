import z from "zod";


export const adminLoginSchema  = z.object({
    email : z.string(),
    password : z.string().min(6, 'password should be atleast 6 characters')
})


export type  AdminLoginInput = z.infer<typeof adminLoginSchema>