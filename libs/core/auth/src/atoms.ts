import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTransformer } from "@zix/api";

const storage = createJSONStorage(() => AsyncStorage);

export const AUTH_TOKEN_KEY = "AUTH_TOKEN_KEY";
export const AUTH_USER_KEY = "AUTH_USER_KEY";

export const authAccessTokenStorage = atomWithStorage<string | undefined>(
  AUTH_TOKEN_KEY,
  undefined,
  storage,
);

export const authUserStorage = atomWithStorage<UserTransformer | undefined>(
  AUTH_USER_KEY,
  undefined,
  storage,
);
