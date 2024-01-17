import {
  SessionContext as SessionContextHelper,
} from "@supabase/auth-helpers-react";
import { createContext } from "react";
import { supabase } from "../client/client";

export const SessionContext = createContext<SessionContextHelper>({
  session: null,
  error: null,
  isLoading: false,
  supabaseClient: supabase,
});
