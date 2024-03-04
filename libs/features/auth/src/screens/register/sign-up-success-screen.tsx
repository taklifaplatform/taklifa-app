import { SubmitButton } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { H2, Text, Theme, YStack } from 'tamagui';
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
  const { registerSteps, requestedAccountType } = useAuth();


  function onComplete() {
    router.replace(redirect || '/customer')
  }

  const renderAccountVerificationProcessMessage = () =>
    requestedAccountType !== 'customer' && (
      <YStack gap="$3" paddingVertical='$4'>
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
        activeStep={registerSteps + 1}
        totalSteps={registerSteps}
      />
      <YStack
        flex={1}
        gap="$3"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom='$4'
      >
        <YStack alignItems="center" gap="$8">
          <H2 $sm={{ size: '$8' }} textAlign="center">
            {t('auth:account_created.description')}
          </H2>
          <CustomIcon name="success" size="$12" color="$color5" />
        </YStack>
        {renderAccountVerificationProcessMessage()}
      </YStack>
      <Theme inverse>
        <SubmitButton
          marginHorizontal="$4"
          borderRadius="$10"
          onPress={() => onComplete()}
        >
          {t('common:next')}
        </SubmitButton>
      </Theme>
    </YStack>
  );
};

export default SignUpSuccessScreen;
