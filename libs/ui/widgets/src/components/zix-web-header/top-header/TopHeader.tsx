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
        href={'https://www.instagram.com/sawaedlogistics'}
        icon={<CustomIcon name="snapchat" size={'$1.5'} color='$color12' />}
      />
      <ZixLinkButton
        menuItem
        href={'https://www.instagram.com/sawaedlogistics'}
        icon={<Instagram size='$1.5' color='$color12' />}
      />
      <ZixLinkButton
        menuItem
        href={'https://www.x.com/sawaedlogistics'}
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
