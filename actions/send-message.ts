"use server";

import { VerifyCaptcha } from "@/utils/captcha";

interface sendMessageProps {
  token: string | null;
  formData: FormData;
}

export default async function sendMessage({
  token,
  formData,
}: sendMessageProps) {
  if (!token) {
    return {
      success: false,
      message: "Token not found!",
    };
  }

  if (!formData) {
    return {
      success: false,
      message: "Form data not found!",
    };
  }

  // TODO : verify captcha
  const captcha = await VerifyCaptcha(token);
  console.log("🚀 ~ captcha:", captcha);

  if (!captcha) {
    return {
      success: false,
      message: "Captcha verification failed!",
    };
  }

  if (!captcha.success || captcha.score < 0.5) {
    return {
      success: false,
      message: "Captcha verification failed!",
    };
  }

  return {
    success: true,
    message: "Send message success!",
  };
}
