import { useSupabase } from "@zix/core/supabase";
import { useUser } from "@zix/core/auth";
import { useEffect, useState } from "react";
import { ZixChat } from "../sdk-adapter/ZixChat";

const client = ZixChat.getInstance();

export function useChatClient() {
  const supabase = useSupabase();
  const { user, profile } = useUser();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    if (!client.supabase) {
      client.setSupabaseClient(supabase);
    }

    setTimeout(() => {
      setClientReady(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (profile && !client.user?.id) {
      client.connectUser(profile);
    }
  }, [profile]);

  return { client, chatClient: client, clientReady };
}
