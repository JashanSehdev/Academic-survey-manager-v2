'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { StudentLoginInput, studentLoginSchema } from "./student-login.type"
import { Button, Stack } from "@mui/material"
import ControlField from "@/components/form-components/control-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/features/store"
import { studentloginAsync } from "@/features/auth/handle-auth/student-auth.actions"

export default function StudentLoginForm () {
    const {loading} = useAppSelector((state) => state.auth)
    const {control, handleSubmit} = useForm<StudentLoginInput>({
        resolver : zodResolver(studentLoginSchema),
        defaultValues : {
            email : '',
            card_id : ""
        }
    })

    const router = useRouter()
    const dispatch = useAppDispatch()

    const onSubmit : SubmitHandler<StudentLoginInput> = async(data) => {
        const result = await dispatch(studentloginAsync(data));

        if (studentloginAsync.fulfilled.match(result)){
            router.push("/")
        }
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <ControlField 
                    name = "card_id"
                    control={control}
                    label="Enter your card ID"
                    placeholder="10012"
                />

                <ControlField 
                    name = "email"
                    control={control}
                    label="Enter Your email"
                    placeholder="abc@uni@edu.in"
                    type="email"
                />
            </Stack>

            <Button loading={loading} variant="contained" sx={{margin: 2}} type="submit">
                Login
            </Button>
        </form>
    )
}