import { ChevronDown } from '@tamagui/lucide-icons';
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Pressable } from 'react-native';
import {
  Adapt,
  AlertDialog,
  Button,
  Image,
  Popover,
  Select,
  Text,
  XStack,
  YStack,
} from 'tamagui';

export function TopHeader() {
  const { changeLanguage } = useMultiLang();

  const language = [
    { name: 'en', label: t('account:language:en') },
    { name: 'ar', label: t('account:language:ar') },
  ];

  const homeInfo = () => (
    <Pressable onPress={() => {}}>
    <XStack justifyContent="center" alignItems="center" gap="$3">
      <Text fontWeight="500" fontSize="$2">
        {t('web-home:about')}
      </Text>
      <CustomIcon name={'homeinfo'} size="$1" />
    </XStack>
    </Pressable>
  );

  const homeQuestion = () => (
    <Pressable onPress={() => {}}>
    <XStack justifyContent="center" alignItems="center" gap="$3">
      <Text fontWeight="500" fontSize="$2">
        {t('web-home:question')}
      </Text>
      <CustomIcon name={'help'} size="$1" />
    </XStack>
    </Pressable>
  );

  const onSelectTranslate = () => (
    <XStack>
    
    
      <Popover size="$3" allowFlip>
        <Popover.Trigger asChild>
        <Pressable onPress={() => {}}>
        <XStack justifyContent="center" alignItems="center" gap="$3">
        {t('web-home:translate')}
        <CustomIcon name={'translate'} size="$1"/>
        </XStack>
        </Pressable>
        </Popover.Trigger>
        <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <YStack space="$3">
          <Text fontWeight="500" fontSize="$2">
            {t('account:language:select_language')}
          </Text>
          {language.map((item, index) => (
            <Button key={index} size="$3" onPress={() => changeLanguage(item.name)}>
              {item.label}
            </Button>
          ))}
        </YStack>
      </Popover.Content>
      </Popover>
    </XStack>
  );

  const location = () => (
    <XStack justifyContent="center" alignItems="center" gap="$3">
      <Text fontWeight={'500'} fontSize="$2">
        saudi arabia
      </Text>
      <Image
        source={{
          uri: '/images/flag.png',
          width: 20,
          height: 20,
        }}
        resizeMode="contain"
      />
      <CustomIcon name={'location'} size="$1" />
    </XStack>
  );

  const download = () => (
    <XStack justifyContent="center" alignItems="center" gap="$3">
      <Pressable onPress={() => {}}>
      <CustomIcon name={'appstore'} size="$8" />
      </Pressable>
      <Pressable onPress={() => {}}>
      <CustomIcon name={'googleplay'} size="$8" />
      </Pressable>
      <Text fontWeight={'500'} fontSize="$2">
        {t('web-home:download')}
      </Text>
    </XStack>
  );

  const followUs = () => (
    <XStack justifyContent="center" alignItems="center" gap="$3">
      <Pressable onPress={() => {}}>
      <CustomIcon name={'facebook'} />
      </Pressable>
      <Pressable onPress={() => {}}>
      <CustomIcon name={'instagram'} />
      </Pressable>
      <Pressable onPress={() => {}}>
      <CustomIcon name={'snapchat'} />
      </Pressable>
      <Text fontWeight={'500'} fontSize="$2">
        {t('web-home:followus')}
      </Text>
    </XStack>
  );

  return (
    <XStack
      $sm={{ display: 'none' }}
      alignItems="center"
      justifyContent="space-around"
      backgroundColor="$gray3"
    >
      {followUs()}
      {download()}
      {location()}
      {/* {translate()} */}
      {onSelectTranslate()}
      {homeQuestion()}
      {homeInfo()}
    </XStack>
  );
}
