import { Check } from '@tamagui/lucide-icons';
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Pressable } from 'react-native';
import {
  Adapt,
  Image,
  Popover,
  Separator,
  Stack,
  Text,
  XStack,
  YStack,
} from 'tamagui';

export function TopHeader() {
  const { changeLanguage, activeLang } = useMultiLang();
  const router = useRouter();

  const languages = [
    { name: 'en', label: t('account:language:en') },
    { name: 'ar', label: t('account:language:ar') },
  ];

  const renderHomeInfo = () => (
    <Pressable onPress={() => router.push('/about')}>
      <XStack justifyContent="center" alignItems="center" gap="$3">
        <CustomIcon name={'homeinfo'} size="$1" />
        <Text fontWeight="500" fontSize="$2">
          {t('web-home:about')}
        </Text>
      </XStack>
    </Pressable>
  );

  const renderHomeQuestion = () => (
    <Pressable onPress={() => router.push('/contact')}>
      <XStack justifyContent="center" alignItems="center" gap="$3">
        <CustomIcon name={'help'} size="$1" />
        <Text fontWeight="500" fontSize="$2">
          {t('web-home:question')}
        </Text>
      </XStack>
    </Pressable>
  );

  const renderSelectTranslate = () => (
    <XStack
      justifyContent="center"
      alignItems="center"
      gap="$3"
      $md={{ display: 'none' }}
    >
      <Popover size="$3" allowFlip>
        <Popover.Trigger asChild>
          <Pressable onPress={() => { }}>
            <XStack justifyContent="center" alignItems="center" gap="$3">
              <CustomIcon name={'translate'} size="$1" />
              {t('web-home:translate')}
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
          borderWidth={0}
          borderColor="transparent"
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
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
          <YStack gap="$3" justifyContent="center">
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
        </Popover.Content>
      </Popover>
    </XStack>
  );

  const renderLocation = () => (
    <XStack
      justifyContent="center"
      alignItems="center"
      gap="$3"
      $md={{ display: 'none' }}
    >
      <CustomIcon name={'location'} size="$1" />

      <Image
        source={{
          uri: '/images/flag.png',
          width: 20,
          height: 20,
        }}
        resizeMode="contain"
      />
      <Text fontWeight={'500'} fontSize="$2">
        saudi arabia
      </Text>
    </XStack>
  );

  const renderDownload = () => (
    <XStack justifyContent="center" alignItems="center" gap="$3">
      <Text fontWeight={'500'} fontSize="$2">
        {t('web-home:download')}
      </Text>
      <Pressable onPress={() => { }}>
        <CustomIcon name={'appstore'} size="$6" />
      </Pressable>
      <Pressable onPress={() => { }}>
        <CustomIcon name={'googleplay'} size="$6" />
      </Pressable>

    </XStack>
  );

  const renderFollowUs = () => (
    <XStack
      justifyContent="center"
      alignItems="center"
      gap="$3"
      $lg={{ display: 'none' }}
    >
      <Text fontWeight={'500'} fontSize="$2">
        {t('web-home:followus')}
      </Text>


      <Pressable onPress={() => { }}>
        <CustomIcon name={'snapchat'} />
      </Pressable>
      <Pressable onPress={() => { }}>
        <CustomIcon name={'instagram'} />
      </Pressable>
      <Pressable onPress={() => { }}>
        <CustomIcon name={'facebook'} />
      </Pressable>

    </XStack>
  );

  return (
    <XStack
      $sm={{ display: 'none' }}
      alignItems="center"
      justifyContent="space-around"
      backgroundColor="$gray3"
      borderTopLeftRadius={'$4'}
      borderTopRightRadius={'$4'}
    >
      {renderHomeInfo()}
      {renderHomeQuestion()}
      {renderSelectTranslate()}
      {renderLocation()}
      {renderDownload()}
      {renderFollowUs()}

    </XStack>
  );
}
