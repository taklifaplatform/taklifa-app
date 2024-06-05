import { createContext, useContext } from "react";
import Echo from 'laravel-echo';



export const LaravelEchoContext = createContext<Echo | null>(null)


export const useEcho = () => {
  const echo = useContext(LaravelEchoContext);
  if (!echo) {
    throw new Error('useEcho must be used within a LaravelEchoProvider');
  }
  return echo;
}
