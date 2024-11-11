import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Stack, Text, XStack, YStack } from 'tamagui';
import SecondBannerEn from '../../../images/second-banner-en.svg';
import SecondBannerAr from '../../../images/second-banner-ar.svg';


export function SecondBanner() {
  const { activeLang } = useMultiLang();

  const renderImageBackground = () => {
    const BannerImage = activeLang === 'ar' ? SecondBannerAr : SecondBannerEn;

    return (
      <Stack
        width={'100%'}
        height={300}
        $sm={{
          height: 200,
        }}
      >
        <BannerImage
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Stack>
    );
  };
  const renderWelcomeText = () => (
    <YStack
      alignItems="center"
      width={'100%'}
      paddingVertical="$2"
    >
      <XStack
        alignItems="center"
        gap="$2"
        paddingVertical="$4"
        $md={{ gap: 0, paddingVertical: 0 }}
      >
        <Text
          fontWeight="800"
          fontSize={30}
          textAlign="center"
          $md={{
            fontSize: 15,
          }}
        >
          {t('web-home:banner-2')}
        </Text>
        <ZixLinkButton
          linkItem
          href={'/'}
          iconAfter={
            <CustomIcon name="large_arrow_right" size="$1" color="$color12" />
          }
          alignItems="center"
        />
      </XStack>
      <Text
        fontWeight="400"
        fontSize={25}
        textAlign="center"
        width="95%"
        paddingTop="$4"
        lineHeight={50}
        $sm={{
          fontSize: 15,
          lineHeight: 25,
          paddingTop: '$1',
          textAlign: 'center',
        }}
      >
        {t('web-home:content-2')}
      </Text>
    </YStack>
  );
  const renderIcons = () => (
    <XStack
      position="absolute"
      w={'100%'}
      top={-30}
      alignItems="center"
      justifyContent="center"
      gap="$13"
      $sm={{
        gap: '$2',
      }}
    >
      <YStack alignItems="center" gap="$2">
        <CustomIcon name="client" size="$5" />
        <Text
          fontWeight="600"
          $sm={{
            fontSize: 10,
          }}
        >
          {t('web-home:client')}
        </Text>
      </YStack>
      <YStack alignItems="center" gap="$2">
        <CustomIcon name="shipping" size="$5" />
        <Text
          fontWeight="600"
          $sm={{
            fontSize: 10,
          }}
        >
          {t('web-home:driver')}
        </Text>
      </YStack>
      <YStack alignItems="center" gap="$2">
        <CustomIcon name="company_shipping" size="$5" />
        <Text
          fontWeight="600"
          $sm={{
            fontSize: 10,
          }}
        >
          {t('web-home:company')}
        </Text>
      </YStack>
    </XStack>
  );
  const renderOptionText = () => (
    <YStack
      alignItems="center"
      w={'100%'}
      justifyContent="center"
      backgroundColor={'$color1'}
      borderRadius="$4"
      paddingVertical="$8"
      marginBottom="$3"
      $sm={{
        paddingVertical: '$2',
      }}
    >
      {renderIcons()}
      <XStack
        alignItems="center"
        gap="$2"
        paddingVertical="$4"
        marginTop="$6"
        $md={{ gap: '$1', paddingVertical: '$1', marginTop: '$6' }}
      >
        <Text
          fontWeight="800"
          fontSize={30}
          textAlign="center"
          $md={{
            fontSize: 13,
          }}
        >
          {t('web-home:banner-3')}
        </Text>
        <ZixLinkButton
          display="linkItem"
          href={'/'}
          iconAfter={
            <CustomIcon name="large_arrow_right" size="$1" color="$color12" />
          }
          alignItems="center"
        />
      </XStack>

      <Text
        fontWeight="400"
        fontSize={25}
        textAlign="center"
        suppressHighlighting={true}
        width="80%"
        paddingTop="$6"
        lineHeight={50}
        $sm={{
          fontSize: 15,
          lineHeight: 25,
          paddingTop: '$3',
          textAlign: 'center',
        }}
      >
        {t('web-home:content-3')}
      </Text>
    </YStack>
  );

  return (
    <YStack>
      {renderWelcomeText()}
      {renderImageBackground()}
      {renderOptionText()}
    </YStack>
  );
}
