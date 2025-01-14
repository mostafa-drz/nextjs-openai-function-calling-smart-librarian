"use server";

import { handleUserInput } from "./openai";

export async function formSubmitAction(formData: FormData) {
  const userInput = formData.get("userInput") as string;
  const response = await handleUserInput(userInput);
  return response;
}
