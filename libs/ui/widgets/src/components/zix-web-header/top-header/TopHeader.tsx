import { Facebook, Instagram, Twitter } from '@tamagui/lucide-icons';
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
      display="linkItem"
      href={'/about'}
      icon={<CustomIcon name={'home_info'} size="$1" />}
    >
      <Text>{t('web-home:about')}</Text>
    </ZixLinkButton>
  );
  const renderHomeQuestion = () => (
    <ZixLinkButton
      display="linkItem"
      href={'/faqs'}
      icon={<CustomIcon name={'help'} size="$1" />}
    >
      <Text>{t('web-home:question')}</Text>
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
        }}
        prependPlaceHolder={<CustomIcon name={'translate'} size="$1" />}
        fontSize="$5"
        fontWeight="500"
        options={languages}
        onChange={(value) => changeLanguage(value)}
        value={activeLang}
      />
    </Stack>
  );
  const renderLocation = () => (
    <ZixLinkButton
      display="linkItem"
      href={'/contact'}
      icon={<CustomIcon name={'location'} size="$1" />}
    >
      <Image
        source={{
          uri: '/images/flag.png',
          width: 20,
          height: 20,
        }}
        resizeMode="contain"
      />
      <Text $md={{ display: 'none' }}>{t('web-home:saudi_arabia')}</Text>
    </ZixLinkButton>
  );
  const renderFollows = () => (
    <XStack gap="$1" alignItems="center">
      <Text $lg={{ display: 'none' }}>
        {t('web-home:followus')}
      </Text>
      <ZixLinkButton
        display="menuItem"
        href={'/'}
        icon={<CustomIcon name="snapchat" size={'$1.5'} color={'$color'} />}
        path={'/'}
      />
      <ZixLinkButton
        display="menuItem"
        href={'https://www.instagram.com/sawaedlogistics'}
        icon={<Instagram size='$1.5' color='$gray12' />}
      />
      <ZixLinkButton
        display="menuItem"
        href={'/'}
        icon={<CustomIcon name="facebook" size={'$1.5'} color={'$color'} />}
        path={'/'}
      />
    </XStack>
  );
  const renderDownload = () => (
    <XStack gap="$1" alignItems="center">
      <Text $lg={{ display: 'none' }}>
        {t('web-home:download')}
      </Text>
      <ZixLinkButton
        display="menuItem"
        href={'/'}
        icon={<CustomIcon name={'google_play'} size={'$8'} />}
      />
      <ZixLinkButton
        display="menuItem"
        href={'/'}
        icon={<CustomIcon name={'app_store'} size={'$8'} />}
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
