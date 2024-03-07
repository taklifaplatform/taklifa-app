import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { ZixSelectField } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useState } from 'react';
import { Separator, Text, XStack, YStack } from 'tamagui';

export function MobileDrawer() {
  const { changeLanguage, activeLang } = useMultiLang();
  const languages = [
    { id: 'en', name: t('account:language:en') },
    { id: 'ar', name: t('account:language:ar') },
    { id: 'ur', name: t('account:language:ur') },
  ];

  const renderTranslate = () => (
    
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
    
  );

  const renderHome = () => (
    <ZixLinkButton
      display="linkItem"
      href={'/'}
      icon={<CustomIcon name={'home_info'} size="$1" />}
    >
      {t('web-home:home')}
    </ZixLinkButton>
  );
  const renderQuestion = () => (
    <ZixLinkButton
      display="linkItem"
      href={'/jobs'}
      icon={<CustomIcon name={'help'} size="$1" />}
    >
      {t('web-home:question')}
    </ZixLinkButton>
  );
  const renderCall = () => (
    <ZixLinkButton
      display="linkItem"
      href={'/customer/contact'}
      icon={<CustomIcon name={'ringing'} size="$1" />}
    >
      {t('web-home:call')}
    </ZixLinkButton>
  );
  const renderSearch = () => (
    <ZixLinkButton
      display="linkItem"
      href={'/jobs'}
      icon={<CustomIcon name={'search'} size="$1" />}
    >
      {t('web-home:search')}
    </ZixLinkButton>
  );
  const renderFollows = () => (
    <YStack gap="$4" paddingVertical="$2">
      <Text fontWeight="600">{t('web-home:followus')}</Text>

      <XStack gap="$4">
        <ZixLinkButton
          display="menuItem"
          href={'/'}
          icon={<CustomIcon name="facebook" size={'$1.5'} color={'$color'} />}
          path={'/'}
        />
        <ZixLinkButton
          display="menuItem"
          href={'/'}
          icon={<CustomIcon name="instagram" size={'$1.5'} color={'$color'} />}
          path={'/'}
        />
        <ZixLinkButton
          display="menuItem"
          href={'/'}
          icon={<CustomIcon name="snapchat" size={'$1.5'} color={'$color'} />}
          path={'/'}
        />
      </XStack>
    </YStack>
  );

  const renderDownload = () => (
    <YStack gap="$2">
      <Text fontWeight="600">{t('web-home:download')}</Text>
      <XStack gap="$4">
        <ZixLinkButton
          display="menuItem"
          href={'/'}
          icon={<CustomIcon name={'app_store'} size={'$8'} />}
        />
        <ZixLinkButton
          display="menuItem"
          href={'/'}
          icon={<CustomIcon name={'google_play'} size={'$8'} />}
        />
      </XStack>
    </YStack>
  );
  const renderJob = () => (
    <ZixLinkButton display="linkItem" href={'/jobs'}>
      {t('web-home:works')}
    </ZixLinkButton>
  );
  const renderShipment = () => (
    <ZixLinkButton display="linkItem" href={'/customer/shipments'}>
      {t('web-home:payments')}
    </ZixLinkButton>
  );
  const renderOrder = () => (
    <ZixLinkButton display="linkItem" href={'/customer/orders'}>
      {t('web-home:followers')}
    </ZixLinkButton>
  );

  return (
    <YStack gap="$2" padding="$4" alignItems="flex-start">
      {renderHome()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderQuestion()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderTranslate()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderCall()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderSearch()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderJob()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderShipment()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderOrder()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderFollows()}
      <Separator width="100%" borderColor={'$gray7'} />
      {renderDownload()}
    </YStack>
  );
}
