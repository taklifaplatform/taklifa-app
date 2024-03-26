
import { useMultiLang } from '@zix/i18n';
import { Search, Home, Languages,HelpCircle,MapPin } from '@tamagui/lucide-icons';
import { ZixInput, ZixSelectField } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useState } from 'react';
import { Separator, Text, XStack, YStack, Image, Button } from 'tamagui';

export function MobileDrawer() {
  const [search, setSearch] = useState('');
  const { changeLanguage, activeLang } = useMultiLang();
  const languages = [
    { id: 'en', name: t('account:language:en') },
    { id: 'ar', name: t('account:language:ar') },
    { id: 'ur', name: t('account:language:ur') },
  ];
  // const renderSearch = () => (
  //   <ZixInput
  //     rightIcon={() => <Search size="$1" />}
  //     placeholder={t('job:search')}
  //     borderColor={'$gray10'}
  //     backgroundColor={'$gray1'}
  //     hoverStyle={{ borderColor: '$gray10' }}
  //     onChangeText={(text) => setSearch(text)}
  //     value={search}
  //     containerProps={{
  //       width: '100%',
  //     }}
  //   />
  // );
  const renderHome = () => (
    <Button
      theme={'accent'}
      borderRadius={10}
      href={'/'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
    >
      <Text
        fontWeight="600"
      >{t('web-home:home')}</Text>
    </Button>
  );
  const renderShipment = () => (
    <Button
      theme={'accent'}
      href={'/customer/shipments'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
    >
      <Text
        fontWeight="600"
        color={'$color12'}
      >{t('web-home:payments')}</Text>
    </Button>
  );
  const renderOrder = () => (
    <Button
      theme={'accent'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/customer/orders'}
    >
      <Text fontWeight="600">{t('web-home:followers')}</Text>
    </Button>
  );
  const renderJob = () => (
    <Button
      theme={'accent'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/jobs'}>
      <Text fontWeight="600">{t('web-home:works')}</Text>
    </Button>
  );
  const renderQuestion = () => (
    <Button
      theme={'accent'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/jobs'}
      icon={<HelpCircle size="$1" />}
    >
      <Text fontWeight="600">{t('web-home:question')}</Text>
    </Button>
  );
  const renderAbout = () => (
    <Button
      theme={'accent'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/jobs'}
      icon={<Home size="$1" />}
    >
      <Text fontWeight="600">{t('web-home:about')}</Text>
    </Button>
  );
  const renderTranslate = () => (
    <XStack
      justifyContent="center"
      alignItems="center"
    >
      <ZixSelectField
        selectTriggerProps={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          gap: '$3',
          iconAfter: null,
        }}
        prependPlaceHolder={<Languages size="$1" />}
        fontSize="$5"
        fontWeight="500"
        options={languages}
        onChange={(value) => changeLanguage(value)}
        value={activeLang}
      />
    </XStack>
  );
  const renderLocation = () => (
    <Button
      theme={'accent'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/contact'}
      icon={<MapPin size="$1" />}
    >
      <Image
        alt="Flag"
        source={{
          uri: '/images/flag.png',
          width: 20,
          height: 20,
        }}
        resizeMode="contain"
      />
      <Text fontWeight="600">{t('web-home:saudi_arabia')}</Text>
    </Button>
  );

  return (
    <YStack
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap="$3"
    >
      {renderHome()}
      {renderShipment()}
      {renderOrder()}
      {renderJob()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderAbout()}
      {renderQuestion()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderTranslate()}
      {renderLocation()}
    </YStack>
  );
}
