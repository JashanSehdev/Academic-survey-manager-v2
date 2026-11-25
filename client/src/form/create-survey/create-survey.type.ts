import { EQuestionType } from "@/enum/question.enum";
import z from "zod";


export const createSurveySchema = z.object({
    title : z.string().min(4, 'tile required minimum 4 characters'),
    description: z.string().optional(),
    activation_date : z.string().min(6, 'activation date required'),
    expiration_date : z.string().min(6, 'expiration date required'),
    is_activated : z.boolean(),
})


export const ratingOptionSchema = z.object({
    min : z.string(),
    max : z.string()
})
export const questionSchema = z.object({
    title : z.string(),
    question_type : z.enum(EQuestionType),
    is_mandatory : z.boolean(),
    mcq_options : z.array(z.string()),
    rating_options : ratingOptionSchema.optional()
})

