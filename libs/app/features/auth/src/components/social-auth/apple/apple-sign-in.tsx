import { Button } from '@zix/app/ui/core';
import { useSupabase } from '@zix/core/supabase';
import { useRouter } from 'solito/router';
import { IconApple } from './icon-apple';

export const AppleSignIn: React.FC = () => {
  const router = useRouter();
  const supabase = useSupabase();
  const handleOAuthSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        // your options
      }
    });
    if (error) {
      // handle error
      return;
    }
    router.replace('/');
  };

  return (
    <Button
      borderRadius="$10"
      onPress={() => handleOAuthSignIn()}
      icon={IconApple}
    >
      Sign in with Apple
    </Button>
  );
};

export default AppleSignIn;
