"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AdminRegistrationInput,
  adminRegistrationSchema,
} from "./admin-registration-form.type";
import { Button, Paper, Stack, Typography } from "@mui/material";
import ControlField from "@/components/form-components/control-field";
import styles from "./admin-registration-form.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { adminRegisterAsync } from "@/features/auth/handle-auth/admin-auth.actions";
import { useRouter } from "next/navigation";

const defaultValues: AdminRegistrationInput = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AdminRegistrationForm() {
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<AdminRegistrationInput>({
    resolver: zodResolver(adminRegistrationSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<AdminRegistrationInput> = async (data) => {
    const { confirmPassword, ...rest } = data;

    const result = await dispatch(adminRegisterAsync(rest));

    if (adminRegisterAsync.fulfilled.match(result)) {
      router.replace("/admin/create-survey");
    }
  };
  return (
    <Paper className={styles.container}>
      <form onClick={handleSubmit(onSubmit)}>
        <Typography variant="h4" className={styles.title}>
          {" "}
          Register
        </Typography>
        <Stack spacing={2}>
          <ControlField
            control={control}
            name="username"
            label="username"
            placeholder="John doe"
          />

          <ControlField
            control={control}
            name="email"
            label="email"
            placeholder="john@uni.edu.in"
          />

          <ControlField
            control={control}
            name="password"
            label="password"
            placeholder="Enter your password"
          />

          <ControlField
            control={control}
            name="confirmPassword"
            label="confirm passwrod"
            placeholder="Confirm your password"
          />
        </Stack>
        <Button loading={loading} type="submit">
          Register
        </Button>

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>

          <Link href="/login">
            <Typography>login</Typography>
          </Link>
        </Stack>
      </form>
    </Paper>
  );
}
