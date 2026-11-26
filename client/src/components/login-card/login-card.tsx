"use client";
import AdminLoginForm from "@/form/admin-login-form/login-form";
import StudentLoginForm from "@/form/student-login-form/student-login-form";
import { validDataE } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data-errors.js";
import { Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Link from "next/link";
import { MouseEvent, useState } from "react";

export default function LoginCard() {
  const [loginAs, setLoginAs] = useState<"admin" | "student">("admin");

  const handleChange = (event: MouseEvent<HTMLElement>, value: string) => {
    setLoginAs(value as "admin" | "student");
  };


  return (
    <Paper sx={{ p: "1rem", minWidth: '400px', maxWidth : '400px', margin: 'auto'}}>
        <Stack spacing={3}>
            <Typography variant="h2"> Login </Typography>
            <ToggleButtonGroup
        value={loginAs}
        onChange={handleChange}
        exclusive
      >
        <ToggleButton value={"admin"}>Login as Admin</ToggleButton>
        <ToggleButton value={"student"}>Login as Student</ToggleButton>
      </ToggleButtonGroup>
      {
        loginAs === 'admin' && <AdminLoginForm />
      }
      {
        loginAs === 'student' && <StudentLoginForm/>
      }
      {
        !loginAs && <Typography variant="h5" align="center">Select Role to Login</Typography>
      }

      <Stack direction={'row'} spacing={1}>
         <Typography variant="caption">{`Don't have an account?`}</Typography>
         <Link href={"/register"}>
            <Typography variant="caption">Register</Typography>
         </Link>
      </Stack>
      

        </Stack>
      
    </Paper>
  );
}
