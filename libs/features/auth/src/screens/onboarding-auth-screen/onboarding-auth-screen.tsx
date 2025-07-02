import { useMultiLang } from '@zix/i18n';
import { useMixpanel } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { Stack, Text, Theme, YStack } from 'tamagui';

export const OnboardingAuthScreen = () => {
  useMixpanel('Onboarding Auth Screen view')
  const { activeLang } = useMultiLang();
  const options = [
    {
      icon: <CustomIcon name="client" size="$6" />,
      title: t('web-home:client'),
      description: t('web-home:client-desc'),
    },
    {
      icon: <CustomIcon name="shipping" size="$6" />,
      title: t('web-home:driver'),
      description: t('web-home:driver-desc'),
    },
    {
      icon: <CustomIcon name="company_shipping" size="$6" />,
      title: t('web-home:company'),
      description: t('web-home:company-desc'),
    },
  ];

  const renderWelcomeText = () => (
    <YStack gap="$2">
      <Text fontSize={20} fontWeight="800">
        مرحبا بك في
      </Text>
      <Text fontSize={35} fontWeight="800">
        سواعد اللوجستية
      </Text>
      <Text fontWeight="400" fontSize={15} lineHeight={25} marginTop="$3">
        {t('web-home:content-2')}
      </Text>
    </YStack>
  );

  const renderOptions = () => (
    <YStack gap="$6">
      <Text fontSize={25} fontWeight="800">
        {t('web-home:banner-3')}
      </Text>
      <YStack gap="$8">
        {options.map((option, index) => (
          <Stack key={index} flexDirection="row" gap={'$4'}>
            {option.icon}
            <YStack gap="$4">
              <Text fontSize={20} fontWeight="700" color="$color1">
                {option.title}
              </Text>
              <Text fontWeight="400" fontSize={15} lineHeight={25}>
                {option.description}
              </Text>
            </YStack>
          </Stack>
        ))}
      </YStack>
    </YStack>
  );

  return (
    <ScreenLayout>
      <Theme name="accent">
        <YStack flex={1} backgroundColor="$color2" gap={'$8'} padding="$10">
          {renderWelcomeText()}
          {renderOptions()}
        </YStack>
      </Theme>
    </ScreenLayout>
  );
};

export default OnboardingAuthScreen;
