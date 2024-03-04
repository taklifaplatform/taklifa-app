import { XStack, YStack } from 'tamagui';
import OnboardingScreen from '../../screens/onboarding-screen/onboarding-screen';
import OnboardingAuthScreen from '../../screens/onboarding-auth-screen/onboarding-auth-screen';

export type AuthLayoutProps = {
  children?: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <XStack flex={1}>
      
      
      <YStack $sm={{ display: 'none' }} width={'50%'}>
        {/* <OnboardingScreen /> */}
        <OnboardingAuthScreen />

      </YStack>
      <YStack width={'50%'} $sm={{ width: '100%' }} paddingVertical="$4" justifyContent="center">
        {children}
      </YStack>
      
    </XStack>
  );
};

export default AuthLayout;
