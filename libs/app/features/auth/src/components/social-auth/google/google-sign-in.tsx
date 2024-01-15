import { Button } from '@zix/app/ui/core';
import { useSupabase } from '@zix/core/supabase';

import { useRouter } from 'solito/router';
import { IconGoogle } from './icon-google';

export const GoogleSignIn: React.FC = () => {
  const router = useRouter();
  const supabase = useSupabase();
  const handleOAuthSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // your options
      }
    });
    if (error) {
      // handle error
    }
    router.replace('/');
  };

  return (
    <Button
      borderRadius="$10"
      onPress={() => handleOAuthSignIn()}
      icon={IconGoogle}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignIn;
