import { Compass, MapPin, Star } from '@tamagui/lucide-icons';
import { CompanyTransformer } from '@zix/api';
import { TitleInfo, UserAvatar, ZixButton } from '@zix/ui/common';
import { IconProps } from 'stream-chat-react/dist/types/types';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';

export function SheetSection({ company }: { company: CompanyTransformer }) {
  const renderLocationInfo = () =>
    !!company?.location?.id && (
      <TitleInfo
        icon={<MapPin size={20} color="$color0" />}
        title={
          company?.location?.address + ' ' + company?.location?.country?.name
        }
      />
    );

  const renderRatingsInfo = () =>
    !!company.rating_stats?.count && (
      <TitleInfo
        icon={<Star size={20} color="$color1" />}
        title={`(${company.rating_stats?.count}) ${company.rating_stats?.score}`}
      />
    );

  return (
    <ScrollView flex={1}>
      <YStack padding="$2" marginBottom="$4" gap="$4">
        <YStack
          // onPress={onPress}
          backgroundColor="$color2"
          borderRadius="$5"
          paddingVertical="$4"
          gap="$6"
        >
          <XStack
            justifyContent="center"
            paddingHorizontal="$4"
            alignItems="center"
            gap="$4"
          >
            <UserAvatar user={company} size="$5" />

            <XStack alignItems="center" gap="$2" flex={1}>
              <YStack alignItems="flex-start" gap="$2">
                <Text color="$color12" fontWeight="bold">
                  {company?.name}
                </Text>

                {renderLocationInfo()}
                {renderRatingsInfo()}
              </YStack>
            </XStack>
          </XStack>
          <XStack
            justifyContent="space-between"
            gap="$2"
            paddingHorizontal="$4"
          >
            <ZixButton
              theme="accent"
              flex={1}
              backgroundColor="$color0"
              icon={(props: IconProps) => (
                <Compass {...props} size={20} color="$color2" />
              )}
              color="$color2"
              fontWeight="600"
              onPress={() => {}}
            >
              تواصل بنا مباشر
            </ZixButton>
            <Button
              flex={1}
              backgroundColor={'transparent'}
              borderWidth={1}
              borderColor={'$color0'}
            >
              لمزيد من التفاصيل
            </Button>
          </XStack>
        </YStack>
        <YStack padding="$2" marginBottom="$4" gap="$4">
          <Text>المنتجات</Text>
        </YStack>
      </YStack>
    </ScrollView>
  );
}

export default SheetSection;
