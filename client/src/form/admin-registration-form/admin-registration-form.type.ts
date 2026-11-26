import z from "zod";

export const adminRegistrationSchema = z.object({
    username : z.string().min(4, 'username sholld be a least 4 characters'),
    email : z.email().endsWith("@uni.edu.in", "email must end with @uni.edu.in"),
    password : z.string().min(6, 'password sholld be a least 6 characters'),
    confirmPassword : z.string().min(6, 'password sholld be a least 6 characters')
}) .refine((data) => data.confirmPassword === data.password , {
    message: "Passwords should be same",
    path : ['confirmPassword'],
    
})

export type AdminRegistrationInput = z.infer<typeof adminRegistrationSchema>

export type DispatchRegistrationCreadentials = Omit<AdminRegistrationInput, "confirmPassword">