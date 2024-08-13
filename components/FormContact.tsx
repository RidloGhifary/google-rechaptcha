"use client";

import sendMessage from "@/actions/send-message";
import { GetCaptchaToken } from "@/utils/captcha";
import type { FormEvent } from "react";
import toast from "react-hot-toast";

export function FormContact() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const loadingToast = toast.loading("Sending message...");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const token = await GetCaptchaToken();
    const response = await sendMessage({ token, formData });
    const { success, message } = response;
    toast.dismiss(loadingToast);

    if (success) {
      toast.success(message);
      form.reset();
    } else {
      toast.error(message);
    }
  }

  return (
    <form className="flex items-center flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <input
        type="name"
        placeholder="Name"
        name="name"
        className="p-2.5 text-lg w-full rounded-md focus:ring-2 focus:ring-blue-300 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="p-2.5 text-lg w-full rounded-md focus:ring-2 focus:ring-blue-300 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
      />
      <textarea
        placeholder="Message"
        name="message"
        className="p-2.5 text-lg w-full rounded-md focus:ring-2 focus:ring-blue-300 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"></textarea>
      <button
        type="submit"
        className="text-lg w-full bg-blue-800 text-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-300 g-recaptcha">
        Submit
      </button>
    </form>
  );
}
