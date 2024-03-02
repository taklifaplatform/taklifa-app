import { useRouter } from 'solito/router';
import { Theme, YStack, Text, Paragraph, XStack, Stack } from 'tamagui';
import { t } from 'i18next';
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { useSafeAreaInsets } from '@zix/utils';

export const OnboardingAuthScreen = () => {
  const { activeLang } = useMultiLang();
  const safeAreaInsets = useSafeAreaInsets();
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
      icon: <CustomIcon name="companyshipping" size="$6" />,
      title: t('web-home:company'),
      description: t('web-home:company-desc'),
    },
  ];

  const renderWelcomeText = () => (
    <YStack gap={'$2'} justifyContent="flex-start" alignItems="flex-end" $lg={{
      gap: '$2',
      alignItems: 'center',
      justifyContent: 'center'
    
    }} >
      <Text
        fontSize={20}
        fontWeight="800"
        textAlign={activeLang === 'en' ? 'left' : 'right'}
        color={'$gray10'}
        $lg={{
          fontSize: 18,
        }}
      >
        مرحبا بك في
      </Text>
      <Text
        fontSize={35}
        fontWeight="800"
        textAlign={activeLang === 'en' ? 'left' : 'right'}
        $lg={{
          fontSize: 25,
        }}
      >
        سواعد اللوجستية
      </Text>
      <Text
        textAlign={activeLang === 'en' ? 'left' : 'right'}
        fontWeight="400"
        fontSize={15}
        lineHeight={25}
        marginTop="$3"
        $lg={{
          fontSize: 13,
          marginTop: '$2',
          textAlign: 'center',
        }}
      >
        {t('web-home:content-2')}
      </Text>
    </YStack>
  );

  const renderOptions = () => (
    <YStack gap={'$6'} justifyContent="flex-start" alignItems="flex-end" $lg={{ 
      gap:'$4',
      alignItems: 'center',
      justifyContent: 'center'
      }}>
      <Text
        fontSize={25}
        fontWeight="800"
        textAlign={activeLang === 'en' ? 'left' : 'right'}
      >
        {t('web-home:banner-3')}
      </Text>
      <YStack gap={'$8'} justifyContent="flex-start" alignItems="flex-end" $lg={{ gap:'$2'}}>
        {options.map((option, index) => (
          <Stack
            flexDirection='row'
            key={index}
            gap={'$4'}
            justifyContent="flex-start"
            alignItems="flex-start"
            $lg={{
              flexDirection: 'column-reverse',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '$2'
            
            }}
          >
            <YStack gap={'$4'} justifyContent="flex-start" $lg={{ gap: '$2' , justifyContent: 'center'}}>
              <Text
                fontSize={20}
                fontWeight="700"
                textAlign={activeLang === 'en' ? 'left' : 'right'}
                $lg={{
                  textAlign: 'center',
                  fontSize: 18,
                }}
                color={'$color5'}
              >
                {option.title}
              </Text>
              <Text
                fontWeight="400"
                fontSize={15}
                lineHeight={25}
                textAlign={activeLang === 'en' ? 'left' : 'right'}
                $lg={{
                  textAlign: 'center',
                  fontSize: 13,
                }}
              >
                {option.description}
              </Text>
            </YStack>
            {option.icon}
          </Stack>
        ))}
      </YStack>
    </YStack>
  );

  return (
    <Theme name={'light'}>
      <YStack
        flex={1}
        backgroundColor="$color3"
        overflow="hidden"
        //
        gap={'$8'}
        paddingTop="$10"
        paddingLeft={activeLang === 'en' ? '$12' : '$14'}
        paddingRight={activeLang === 'en' ? '$14' : '$12'}
        $lg={{
          paddingLeft: '$4',
          paddingRight: '$4',
          gap: '$4'
        
        }}
      >
        {renderWelcomeText()}
        {renderOptions()}
      </YStack>
    </Theme>
  );
};

export default OnboardingAuthScreen;
