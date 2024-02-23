import { Button } from '@zix/app/ui/core';

import { useRouter } from 'solito/router';
import { IconGoogle } from './icon-google';

export const GoogleSignIn: React.FC = () => {
  const router = useRouter();
  const handleOAuthSignIn = async () => {
    alert(JSON.stringify({
      name: 'signInWithOAuth',
      provider: 'google',
      options: {
        // your options
      }
    }));
    // if (error) {
    //   // handle error
    // }
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
