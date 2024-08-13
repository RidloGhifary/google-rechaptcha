"use server";

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

  return {
    success: true,
    message: "Send message success!",
  };
}
