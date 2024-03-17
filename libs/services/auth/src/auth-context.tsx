import { useContext, createContext } from "react";
import { AuthHelpers } from "./use-auth-helpers";

export const AuthContext: React.Context<AuthHelpers> = createContext({} as AuthHelpers);

export const useAuth = () => useContext(AuthContext);
