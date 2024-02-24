let localhost: string | undefined;

export function getLocalhost() {
  if (localhost) return localhost;
}

// replace localhost with the hostname - this will not do anything if using a production / remote URL, as they don't contain `localhost`
export function replaceLocalhost(address: string) {
  return address.replace("://localhost:", `://${getLocalhost()}:`);
}
