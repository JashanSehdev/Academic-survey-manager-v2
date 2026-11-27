import { EProgram } from "@/enum/program.enum";
import { EQuestionType } from "@/enum/question.enum";
import z from "zod";

export const ratingOptionSchema = z.object({
  min: z.string().nullable(),
  max: z.string().nullable(),
});
export const questionSchema = z.object({
  title: z.string(),
  question_type: z.enum(EQuestionType),
  is_mandatory: z.boolean(),
  mcq_options: z.array(
    z.object({
      value: z.string().min(1, "Option is required"),
    }).nullable(),
  ).optional(),
  rating_options: ratingOptionSchema.optional().nullable(),
});

export const createSurveySchema = z.object({
  title: z.string().min(4, "tile required minimum 4 characters"),
  description: z.string().optional(),
  program : z.enum([...Object.values(EProgram), ""]).refine((data) => data !== "" , {message : "Select a program"}),
  activation_date: z.string().min(6, "activation date required"),
  expiration_date: z.string().min(6, "expiration date required"),
  is_activated: z.boolean(),
  questions: z.array(questionSchema).min(1, "At least one question required"),
})

export type CreateSurveyInput = z.infer<typeof createSurveySchema>;
