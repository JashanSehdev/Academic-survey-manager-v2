'use client'
import { Box, Button, FormHelperText, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { createSurveySchema, CreateSurveyInput } from "./create-survey.type";
import { zodResolver } from "@hookform/resolvers/zod";
import SurveyForm from "./survey/survey-form";
import { QuestionForm } from "./question-form/question-form";
import { EQuestionType } from "@/enum/question.enum";
import { useAppDispatch } from "@/features/store";
import { createSurveyAsync } from "@/features/survey/handle-survey/survey.action";
import { AdminAuth } from "@/providers/admin-auth";


function CreateSurveyForm () {

    const dispatch = useAppDispatch()

    const {control, handleSubmit, formState, watch} = useForm<CreateSurveyInput>({
        resolver: zodResolver(createSurveySchema),
        defaultValues:{
            title : "",
            description : "",
            program : "",
            activation_date :  Date.now.toString(),
            expiration_date : Date.now.toString(),
            is_activated : false,
            questions:[
                {
                    title : "",
                    question_type : EQuestionType.TEXT,
                    is_mandatory:false,
                    rating_options : null
                }
            ]
        }
    })

    console.log(watch())
    const onSubmit : SubmitHandler<CreateSurveyInput> = (data) => {
        dispatch(createSurveyAsync(data))
    }



    return (
        <Box sx={{p: 2}}>
            <FormHelperText>{formState.errors.questions?.message}</FormHelperText>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <SurveyForm 
                    control={control}
                />
                <QuestionForm
                    control={control}
                />

                
            </Stack>
            <Button variant="contained" type="submit">
                Submit
            </Button>
       
        </form>

        </Box>
        
    )
}

export default AdminAuth(CreateSurveyForm)