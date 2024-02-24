import { H2, Text, Theme, YStack } from 'tamagui';
import { SubmitButton } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import { useMemo } from 'react';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { AuthHeader } from '../../components/auth-header/auth-header';

const { useParam } = createParam<{ redirect: string }>();

/**
 * Renders the sign-up success screen.
 * This screen is displayed after a user successfully signs up.
 * It shows a success message, account verification process message (if applicable),
 * and a button to proceed to the next step or redirect to a specified page.
 */
export const SignUpSuccessScreen = () => {
  const router = useRouter();
  const [redirect] = useParam('redirect');
  const { user } = useAuth();

  const totalSteps = useMemo(() => {
    if (user?.requested_user_type === 'service_requestor') {
      return 2;
    }
    if (user?.requested_user_type === 'company') {
      return 3;
    }
    if (user?.requested_user_type === 'individual') {
      return 4;
    }
    return 1;
  }, [user?.requested_user_type]);

  const renderAccountVerificationProcessMessage = () =>
    user?.requested_user_type === 'service_provider' && (
      <YStack>
        <Text textAlign="center">
          {t('auth:verification_in_progress.title')}
        </Text>
        <Text textAlign="center">
          {t('auth:verification_in_progress.description')}
        </Text>
      </YStack>
    );

  return (
    <YStack flex={1}>
      <AuthHeader
        showIcon={false}
        activeStep={totalSteps + 1}
        totalSteps={totalSteps}
      />
      <YStack
        flex={1}
        space="$2"
        gap="$3"
        justifyContent="space-between"
        alignItems="center"
      >
        <H2 $sm={{ size: '$8' }} textAlign="center">
          {t('auth:account_created.description')}
        </H2>
        <CustomIcon name="success" size="$12" color="$color5" />
        <YStack gap="$4">{renderAccountVerificationProcessMessage()}</YStack>
      </YStack>
      <Theme inverse>
        <SubmitButton
          marginHorizontal="$4"
          borderRadius="$10"
          onPress={() => router.replace(redirect || '/')}
        >
          {t('common:next')}
        </SubmitButton>
      </Theme>
    </YStack>
  );
};

export default SignUpSuccessScreen;
