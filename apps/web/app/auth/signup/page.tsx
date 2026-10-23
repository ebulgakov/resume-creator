"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";

export default function Signup() {
  return (
    <Stack spacing={2} className="w-full max-w-xs">
      <TextField label="E-mail" variant="outlined" type="email" />
      <TextField label="Пароль" variant="outlined" type="password" />
      <Button variant="contained">Зарегистрироваться</Button>
      <Link component={NextLink} href="/auth/login" className="self-center">
        Войти
      </Link>
    </Stack>
  );
}
