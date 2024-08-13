export async function GetCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        resolve(null);
        return;
      }

      const token = await grecaptcha.execute(siteKey, {
        action: "contact",
      });
      resolve(token);
    });
  });
}

export async function VerifyCaptcha(token: string) {
  const secretKey = process.env.CAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Secret key not found!");
  }

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  url.searchParams.append("secret", secretKey);
  url.searchParams.append("response", token);

  const res = await fetch(url, { method: "POST" });
  if (!res.ok) {
    return null;
  }

  const captchaData = await res.json();
  return captchaData;
}
