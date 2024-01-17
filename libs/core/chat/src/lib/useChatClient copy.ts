import { useSupabase } from 'app/utils/supabase/useSupabase'
import { CustomClient } from '../customClient'
import React, { useEffect, useState } from 'react'
import { useUser } from 'app/utils/useUser'

const client = new CustomClient()

export function useChatClient() {
  const supabase = useSupabase()
  const { user } = useUser()
  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    client.setSupabaseClient(supabase)
    setTimeout(() => {
      setClientReady(true)
    }, 500)
  }, [])

  useEffect(() => {
    if (user) {
      client.connectUser(user)
    }
  }, [user])

  return { client, clientReady }
}
