import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { t } from 'i18next';
import { Stack, Text, Theme, XStack, YStack, Image } from 'tamagui';
import BannerMainImageAr from '../../../images/main-banner-ar.svg';
import BannerMainImageEn from '../../../images/main-banner-en.svg';


/**
 * /customer
 * /solo-driver
 * /company
 * @returns
 */

export function TopBanner() {
  const { activeLang } = useMultiLang();

  const renderImageBackground = () => {
    const BannerImage = activeLang === 'ar' ? BannerMainImageAr : BannerMainImageEn;

    return (
      <YStack
        width='100%'
        alignItems='center'
        justifyContent='center'
        height={632}
      >
        <BannerImage
          borderRadius="$4"
          width={'100%'}
        />
      </YStack>
    );
  };

  const renderText = () => (
    <>
      <Stack
        flexDirection="column"
        flexWrap="wrap"
      >
        <Text
          fontWeight="800"
          fontSize={36}
          paddingVertical="$4"
          textAlign="center"
          $sm={{
            fontSize: 20,
          }}
        >
          {t('web-home:banner-1')}
        </Text>
        <Text
          fontWeight="700"
          fontSize={14}
          textAlign="center"
          $xs={{
            fontSize: 10,
          }}
        >
          {t('web-home:content-1')}
        </Text>
      </Stack>
    </>
  );
  const renderButton = () => (
    <XStack
      theme={'accent'}
      justifyContent="center"
      gap="$6"
      paddingVertical="$6"
      $sm={{
        gap: '$4',
        paddingVertical: '$4',
      }}
    >
      <ZixLinkButton
        linkItem
        href={'/app'}
        borderRadius='$4'
        borderWidth={"$1"}
        borderColor='$color12'
        width={150}
        justifyContent="center"
        $sm={{
          width: 120,
        }}
      >
        {t('web-home:singlecarrier')}
      </ZixLinkButton>
      <ZixLinkButton
        linkItem
        href={'/app'}
        borderRadius='$4'
        borderWidth={"$1"}
        borderColor='$color12'
        width={150}
        justifyContent="center"
        backgroundColor='$color12'
        color='$color3'
        $sm={{
          width: 120,
        }}
      >
        {t('web-home:company')}
      </ZixLinkButton>
    </XStack>
  );

  const renderContainer = () => (
    <Stack
      flex={1}
      flexDirection="column"
      flexWrap="wrap"
      width={'100%'}
      position="absolute"
      justifyContent="center"
      alignItems="center"
      paddingVertical="$6"
      $lg={{
        paddingVertical: '$2',
      }}
    >
      {renderText()}
      {renderButton()}
    </Stack>
  );
  return (
    <Theme name="light">
      <Stack marginBottom="$3">
        {renderImageBackground()}
        {renderContainer()}
      </Stack>
    </Theme>
  );
}
