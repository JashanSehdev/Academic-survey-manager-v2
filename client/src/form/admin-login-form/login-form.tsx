"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { AdminLoginInput, adminLoginSchema } from "./login-form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlField from "@/components/form-components/control-field";
import { Button, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "@/features/store";
import { adminLoginAsync } from "@/features/auth/handle-auth/admin-auth.actions";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { control, handleSubmit } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
        email : "",
        password : ""
    }
  });

  const onSubmit: SubmitHandler<AdminLoginInput> = async(data) => {
    const result = await dispatch(adminLoginAsync(data))

    if (adminLoginAsync.fulfilled.match(result)){
        router.replace('./admin') 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <ControlField
          name="email"
          control={control}
          label="Email"
          placeholder="example@uni.edu.in"
          type="email"
        />

        <ControlField
          name="password"
          control={control}
          label="password"
          placeholder="Enter your password"
          type = "password"
        />
      </Stack>
      <Button variant="contained" sx={{margin: 2}} type="submit">
        Login
      </Button>
    </form>
  );
}
