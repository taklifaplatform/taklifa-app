import { Check } from '@tamagui/lucide-icons';
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Separator, Sheet, Stack, Text, XStack, YStack } from 'tamagui';
import { FooterItem } from './FooterItem';
import { MenuItem } from './MenuItem';

export function MobileDrawer() {
  const { changeLanguage, activeLang } = useMultiLang();
  const [drawer, setDrawer] = useState(false);
  const languages = [
    { name: 'en', label: t('account:language:en') },
    { name: 'ar', label: t('account:language:ar') },
  ];

  const renderSelectTranslate = () => (
    <YStack gap="$3" padding="$2" justifyContent="center">
      {languages.map((item, index) => (
        <>
          <Pressable
            key={index}
            size="$3"
            onPress={() => changeLanguage(item.name)}
          >
            <XStack gap="$3" justifyContent="space-between" padding="$2">
              {activeLang === item.name ? (
                <Check size="$1" />
              ) : (
                <Stack width="$1" height="$1" />
              )}
              <Text fontSize="$2">{item.label}</Text>
            </XStack>
          </Pressable>
          <Separator width="100%" borderColor={'$gray7'} />
        </>
      ))}
    </YStack>
  );

  const renderSheet = () => (
    <Sheet snapPoints={[40, 50]} open={drawer} modal={true}>
      <Sheet.Overlay onPress={() => setDrawer(!drawer)} />
      <Sheet.Handle />
      <Sheet.Frame>{renderSelectTranslate()}</Sheet.Frame>
    </Sheet>
  );

  const renderTranslate = () => (
    <Pressable
      onPress={() => {
        setDrawer(!drawer);
      }}
    >
      <XStack
        alignItems="center"
        paddingVertical="$2"
        backgroundColor={'transparent'}
        borderBottomWidth={0}
        gap="$3"
        hoverStyle={{
          cursor: 'pointer',
        }}
      >
        <Text fontWeight={'bold'} fontSize="$5">
          {t('web-home:translate')}
        </Text>
        <CustomIcon name={'translate'} size="$1" />
      </XStack>
    </Pressable>
  );

  const renderHome = () => (
    <MenuItem
      name={t('web-home:home')}
      path={'/'}
      icon={<CustomIcon name={'homeinfo'} size="$1" />}
    />
  );
  const renderQuestion = () => (
    <MenuItem
      name={t('web-home:question')}
      path={'/jobs'}
      icon={<CustomIcon name={'help'} size="$1" />}
    />
  );
  const renderCall = () => (
    <MenuItem
      name={t('web-home:call')}
      path={'/customer/contact'}
      icon={<CustomIcon name={'rigning'} size="$1" />}
    />
  );
  const renderSearch = () => (
    <MenuItem
      name={t('web-home:search')}
      path={'/jobs'}
      icon={<CustomIcon name={'search'} size="$1" />}
    />
  );
  const renderFollows = () => (
    <>
      <MenuItem name={t('web-home:followus')} />
      <MenuItem
        path={'/jobs'}
        iconAfter={
          <XStack gap="$4">
            <FooterItem
              icon={
                <CustomIcon name="facebook" size={'$1.5'} color={'$color'} />
              }
              path={'/'}
            />
            <FooterItem
              icon={
                <CustomIcon name="instagram" size={'$1.5'} color={'$color'} />
              }
              path={'/'}
            />
            <FooterItem
              icon={
                <CustomIcon name="snapchat" size={'$1.5'} color={'$color'} />
              }
              path={'/'}
            />
          </XStack>
        }
      />
    </>
  );

  const renderDownload = () => (
    <>
      <MenuItem name={t('web-home:download')} />
      <MenuItem
        path={'/jobs'}
        iconAfter={
          <XStack gap="$4">
            <FooterItem
              icon={
                <CustomIcon name={'appstore'} width={'123px'} height={'35px'} />
              }
              path={'/'}
            />
            <FooterItem
              icon={
                <CustomIcon
                  name={'googleplay'}
                  width={'123px'}
                  height={'35px'}
                />
              }
              path={'/'}
            />
          </XStack>
        }
      />
    </>
  );
  const renderJob = () => (
    <MenuItem name={t('web-home:works')} path={'/jobs'} />
  );
  const renderShipment = () => (
    <MenuItem name={t('web-home:payments')} path={'/customer/shipments'} />
  );
  const renderOrder = () => (
    <MenuItem name={t('web-home:followers')} path={'/customer/orders'} />
  );

  return (
    <YStack gap="$2" padding="$4" alignItems="flex-end">
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
      {renderSheet()}
    </YStack>
  );
}
