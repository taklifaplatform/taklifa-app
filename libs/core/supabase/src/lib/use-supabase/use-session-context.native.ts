import { useContext } from "react";
import { SessionContext } from "./session-context";

export const useSessionContext = () => useContext(SessionContext);
