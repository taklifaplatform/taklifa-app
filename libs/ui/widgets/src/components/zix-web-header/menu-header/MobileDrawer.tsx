
import { useMultiLang } from '@zix/i18n';

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
  const renderSearch = () => (
    <ZixInput
      rightIcon={() => <CustomIcon name="search" size="$1" />}
      placeholder={t('job:search')}
      borderColor={'$gray10'}
      hoverStyle={{ borderColor: '$gray10' }}
      onChangeText={(text) => setSearch(text)}
      value={search}
      containerProps={{
        width: '100%',
      }}
    />
    // <Button
    //   display="linkItem"
    //   href={'/jobs'}
    //   icon={<CustomIcon name={'search'} size="$1" />}
    // >
    //   {t('web-home:search')}
    // </Button>
  );
  const renderHome = () => (
    <Button
      
      borderRadius={10}
      href={'/'}
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontWeight="600"
      >{t('web-home:home')}</Text>
    </Button>
  );
  const renderShipment = () => (
    <Button

      href={'/customer/shipments'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
    >
      <Text fontWeight="600">{t('web-home:payments')}</Text>
    </Button>
  );
  const renderOrder = () => (
    <Button
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
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/jobs'}
      icon={<CustomIcon name={'help'} size="$1" />}
    >
      <Text fontWeight="600">{t('web-home:question')}</Text>
    </Button>
  );
  const renderAbout = () => (
    <Button
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/jobs'}
      icon={<CustomIcon name={'home_info'} size="$1" />}
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
        prependPlaceHolder={<CustomIcon name={'translate'} size="$1" />}
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
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={'transparent'}
      href={'/contact'}
      icon={<CustomIcon name={'location'} size="$1" />}
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
      flex={1}

      alignItems="center"
      justifyContent="center"
      gap="$3"
    >
      {renderSearch()}
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
