"use server";

import { API_URL } from "@/app/env";
import { redirect } from "next/navigation";
import type { FormError } from "@/app/common/form-error.interface";
import { getErrorMessage } from "@/app/utils/errors";

export default async function login(_prevState: FormError, formData: FormData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData))
  });

  const parserRes = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parserRes) };
  }

  redirect("/");
}
