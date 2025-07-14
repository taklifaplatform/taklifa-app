import { AnnouncementTransformer, ServiceTransformer } from "@zix/api";
import { YStack, XStack, Text, Image, View, Button, Stack, Theme } from "tamagui";
import { TouchableOpacity } from "react-native";
import { useRouter } from "solito/router";
import { Building2, Clock, MapPin, Rocket } from "@tamagui/lucide-icons";
import { TitleInfo } from "@zix/ui/common";
import { useAuth } from "@zix/services/auth";
import { CustomIcon } from '@zix/ui/icons';

type ServiceCardProps = {
  service: ServiceTransformer;
  showHeader?: boolean;
};

export const ServiceCard = ({ service, showHeader }: ServiceCardProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const isOwner = user?.id === service?.user?.id;
  return (
    <TouchableOpacity
        onPress={() => {
          router.push(`/app/services/${service.id}`);
        }}
      >
        <XStack
          theme={'accent'}
          backgroundColor={isOwner ? '$color3' : '#F1F2F4'}
          borderWidth={1}
          borderColor={isOwner ? '$color1' : '#F1F2F4'}
          borderRadius="$4"
          marginHorizontal={showHeader ? '$4' : undefined}
          padding="$4"
          gap={'$3'}
          justifyContent="center"
          alignItems="center"
        >
          {isOwner && (
          <XStack
            position="absolute"
            top={-15}
            left={10}
            gap={'$2'}
            padding="$2"
            backgroundColor="$color3"
            alignItems="center"
            justifyContent="center"
            borderRadius={'$6'}
            borderWidth={1}
            borderColor="$color1"
          >
            <Rocket size={15} color="$color1" />
            <Text fontSize={'$1'} fontWeight={'600'} color="$color1">
              خدماتي
            </Text>
          </XStack>
          )}
          {/* //image */}
          <YStack>
            {service?.images?.length ? (
              <Image
                source={{ uri: service?.images[0]?.url }}
                style={{
                  width: 100,
                  height: 120,
                  borderRadius: 10,
                }}
              />
            ) : (
              <Theme reset>
                <View
                  width={100}
                  height={120}
                  backgroundColor="$color2"
                  borderRadius={10}
                  borderWidth={1}
                  borderColor="$color8"
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CustomIcon name="image-blank" size={90} color="$color2" />
                </View>
              </Theme>
            )}
          </YStack>
          <YStack flex={1} justifyContent="space-between" gap="$2">
            {/* title */}
            <Text
              textAlign="left"
              fontWeight="700"
              fontSize={'$2'}
              numberOfLines={1}
            >
              {service?.title || ''}
            </Text>
            <TitleInfo
              icon={<Building2 size={15} color="#000000" />}
              title={service?.description || ''}
              flex={1}
              textAlign="left"
            />
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              alignItems="center"
              gap="$3"
              theme={showHeader ? 'accent' : undefined}
            >
              {!!service?.city && (
                <TitleInfo
                  icon={<MapPin size={15} color="#000000" />}
                  title={service.city}
                  textAlign="left"
                />
              )}
              <TitleInfo
                icon={<Clock size={15} color="#000000" />}
                title={'منذ ساعة'}
              />
            </Stack>
            {/* //price */}

            {/* // button More information */}
            <XStack justifyContent="space-between" marginTop={'$4'}>
              <XStack alignItems="center" gap={'$2'}>
                <Text fontWeight={'bold'} fontSize={'$5'}>
                  {service?.price || '0'}
                </Text>
                <CustomIcon name="riyal" size={'$2'} color="#000000" />
              </XStack>
              <Button
                theme={'accent'}
                pressStyle={{
                  backgroundColor: 'gray'
                }}
                backgroundColor="transparent"
                borderWidth={1}
                borderColor="$color11"
                width={140}
                height={35}
                borderRadius={10}
                justifyContent="center"
                alignItems="center"
                onPress={() => router.push(`/app/services/${service.id}`)}
              >
                <Text fontSize={'$1'} fontWeight={'bold'} color="$color11">
                  شاهد التفاصيل
                </Text>
              </Button>
            </XStack>
          </YStack>
        </XStack>
      </TouchableOpacity>
  );
};

export default ServiceCard;