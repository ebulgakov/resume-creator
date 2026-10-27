import { API_URL } from "@/app/env";
import { getErrorMessage } from "@/app/utils/errors";

export const post = async (path: string, formData: FormData): { error: string } => {
  const response = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData))
  });

  const parserRes = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parserRes) };
  }

  return { error: "" };
};
