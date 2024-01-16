import { XStack, YStack } from '@zix/core/ui';
import OnboardingScreen from '../../screens/onboarding-screen/onboarding-screen';

export type AuthLayoutProps = {
  children?: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <XStack flex={1}>
      <YStack flex={2} paddingVertical="$4" justifyContent="center">
        {children}
      </YStack>

      <YStack $sm={{ display: 'none' }} flex={3}>
        <OnboardingScreen />
      </YStack>
    </XStack>
  );
};

export default AuthLayout;
