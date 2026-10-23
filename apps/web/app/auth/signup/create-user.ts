"use server";

import { API_URL } from "@/app/env";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/app/utils/errors";

export default async function createUser(_prevState: any, formData: FormData) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: formData
  });

  const parserRes = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parserRes) };
  }

  redirect("/");
}
