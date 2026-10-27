"use server";

import { API_URL } from "@/app/env";
import { redirect } from "next/navigation";
import { post } from "@/app/utils/fetch";
import type { FormError } from "@/app/common/form-error.interface";

export default async function createUser(_prevState: FormError, formData: FormData) {
  const { error } = await post("users", formData);

  if (error) {
    return { error };
  }

  redirect("/");
}
