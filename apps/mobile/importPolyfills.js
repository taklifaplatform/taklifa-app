// Fix for JOSE: https://stackoverflow.com/questions/74046745/how-would-you-get-jose-working-in-an-expo-app
import { polyfillWebCrypto } from "expo-standard-web-crypto";
global.Buffer = require("buffer").Buffer;
polyfillWebCrypto();
const TextEncodingPolyfill = require("text-encoding");

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});
