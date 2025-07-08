import { Facebook, Instagram, Twitter, Home, HelpCircle, Languages, MapPin } from '@tamagui/lucide-icons';
import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { ZixSelectField } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import {
  Image,
  Stack,
  Text,
  XStack
} from 'tamagui';

export function TopHeader() {
  const { changeLanguage, activeLang } = useMultiLang();
  const languages = [
    { id: 'en', name: t('account:language:en') },
    { id: 'ar', name: t('account:language:ar') },
    { id: 'ur', name: t('account:language:ur') },
  ];
  const renderHomeInfo = () => (
    <ZixLinkButton
      linkItem
      href={'/about'}
      icon={<Home size='$1' color='$color12' />}
      fontWeight='600'
      fontSize="$2"
    >
      {t('web-home:about')}
    </ZixLinkButton>
  );
  const renderHomeQuestion = () => (
    <ZixLinkButton
      linkItem
      href={'/faqs'}
      icon={<HelpCircle size='$1' color='$color12' />}
      fontWeight='600'
      fontSize="$2"
    >
      {t('web-home:question')}
    </ZixLinkButton>
  );
  const renderSelectTranslate = () => (
    <Stack>
      <ZixSelectField
        selectTriggerProps={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          gap: '$3',
          iconAfter: null,
          fontSize: '$5',
        }}
        prependPlaceHolder={<Languages size="$1" />}
        fontWeight='600'
        fontSize="$2"
        options={languages}
        onChange={(value) => changeLanguage(value)}
        value={activeLang}

      />
    </Stack>
  );
  const renderLocation = () => (
    <ZixLinkButton
      linkItem
      href={'/contact'}
      fontWeight='600'
      fontSize="$2"

    >
      <MapPin size='$1' color='$color12' />
      <Image
        source={{
          uri: '/images/flag.png',
          width: 20,
          height: 20,
        }}
        resizeMode="contain"
      />
      {t('web-home:saudi_arabia')}
    </ZixLinkButton>
  );
  const renderDownload = () => (
    <XStack gap="$1" alignItems="center">
      <Text $lg={{ display: 'none' }}
        fontWeight='600'
        fontSize="$2"
      >
        {t('web-home:download')}
      </Text>
      <ZixLinkButton
        menuItem
        href={'https://play.google.com/store/apps/details?id=app.sawaeed&hl=en'}
        target='_blank'
        icon={<CustomIcon name={'google_play'} size={'$8'} />}
      />
      <ZixLinkButton
        menuItem
        href={'https://apps.apple.com/us/app/sawaeed/id6720725925'}
        target='_blank'
        icon={<CustomIcon name={'app_store'} size={'$8'} />}
      />
    </XStack>
  );
  const renderFollows = () => (
    <XStack gap="$1" alignItems="center">
      <Text $lg={{ display: 'none' }}
        fontWeight='600'
        fontSize="$2"
      >
        {t('web-home:followus')}
      </Text>
      <ZixLinkButton
        menuItem
        href={'https://www.tiktok.com/@taklifa.com'}
        icon={<CustomIcon name="tik_tok" size={'$1.5'} color='$color12' />}
      />
      <ZixLinkButton
        menuItem
        href={'https://www.snapchat.com/add/taklifa.com?share_id=iDs1PAy9ZJw&locale=en-US'}
        icon={<CustomIcon name="snapchat" size={'$1.5'} color='$color12' />}
      />
      <ZixLinkButton
        menuItem
        href={'https://www.instagram.com/taklifa.com'}
        icon={<Instagram size='$1.5' color='$color12' />}
      />
      <ZixLinkButton
        menuItem
        href={'https://www.facebook.com/people/%D8%B3%D9%88%D8%A7%D8%B9%D8%AF-%D8%A7%D9%84%D9%84%D9%88%D8%AC%D8%B3%D8%AA%D9%8A%D8%A9/pfbid034HMQXwBev6dQNzo11Rmcih9Q8j2FU6S4Z9vhxPpcAiEWB3othkiHc4siBteJeFEl/?rdid=EvToBViZdnBkK9f1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FkReVQwMD%2F'}
        icon={<Facebook size='$1.5' color='$color12' />}
      />
    </XStack>
  );

  return (
    <XStack
      $sm={{ display: 'none' }}
      alignItems="center"
      justifyContent="space-around"
      backgroundColor="$color2"
      flex={1}
      height={50}
    >
      {renderHomeInfo()}
      {renderHomeQuestion()}
      {renderSelectTranslate()}
      {renderLocation()}
      {renderDownload()}
      {renderFollows()}
    </XStack>
  );
}
