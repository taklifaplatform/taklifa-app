import { isWeb } from "tamagui";
import { replaceLocalhost } from "../get-localhost/get-localhost";

export function _getBaseUrl() {
  if (isWeb && typeof window !== "undefined") {
    console.log(typeof window);
    // browser should use relative path
    return "";
  }

  if (process.env.APP_PUBLIC_URL) {
    // overwrites the rest - set this on your native app deployment
    return `${process.env.APP_PUBLIC_URL}`;
  }

  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getBaseUrl() {
  let url = _getBaseUrl();
  if (!isWeb) {
    url = replaceLocalhost(url);
  }
  return url;
}
