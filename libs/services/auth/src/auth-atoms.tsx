import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTransformer } from "@zix/api";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { AUTH_ROLE_TYPE } from "./types";

export const storage = createJSONStorage(() => AsyncStorage);

export const AUTH_TOKEN_KEY = "AUTH_TOKEN_KEY";
export const AUTH_USER_KEY = "AUTH_USER_KEY";
export const AUTH_REQUESTED_ACCOUNT_TYPE = "AUTH_REQUESTED_ACCOUNT_TYPE";

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

export const authRequestedAccountTypeStorage = atomWithStorage<AUTH_ROLE_TYPE>(
  AUTH_REQUESTED_ACCOUNT_TYPE,
  'customer',
  storage,
);
