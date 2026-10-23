"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import createUser from "./create-user";

export default function Signup() {
  const [state, formAction] = useFormState(createUser, {
    error: ""
  });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          name="email"
          label="E-mail"
          variant="outlined"
          type="email"
          helperText={state.error}
          error={!!state.error}
        />
        <TextField
          name="password"
          label="Пароль"
          variant="outlined"
          type="password"
          helperText={state.error}
          error={!!state.error}
        />
        <Button variant="contained" type="submit">
          Зарегистрироваться
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Войти
        </Link>
      </Stack>
    </form>
  );
}
