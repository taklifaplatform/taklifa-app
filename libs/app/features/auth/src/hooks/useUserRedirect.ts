import { User } from '@supabase/supabase-js'
import { useUser } from 'app/utils/useUser'
import { useCallback } from 'react'
import { useRouter } from 'solito/router'

export function useUserRedirect() {
  const { user } = useUser()
  const router = useRouter()

  const redirectUser = useCallback(
    (_user?: User) => {
      // TODO handel user redirect base on last active dashboard or what he have registered with

      if (!user && !_user) {
        router.push('/auth/login')
      } else {
        router.push('/customer')
      }
    },
    [router, user]
  )

  return {
    redirectUser,
  }
}
