import { Button } from 'tamagui';
import { useRouter } from 'solito/router';
import { IconApple } from './icon-apple';

export const AppleSignIn: React.FC = () => {
  const router = useRouter();
  const handleOAuthSignIn = async () => {
    alert(
      JSON.stringify({
        name: 'signInWithOAuth',
        provider: 'apple',
        options: {
          // your options
        },
      })
    );
    // if (error) {
    //   // handle error
    //   return;
    // }
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
