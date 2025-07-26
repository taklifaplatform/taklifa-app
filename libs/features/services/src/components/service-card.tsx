import { Building2, Clock, MapPin, Rocket } from '@tamagui/lucide-icons';
import { ServiceTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { TextInfo } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Image, Stack, Text, XStack, YStack } from 'tamagui';

type ServiceCardProps = {
  service: ServiceTransformer;
  showHeader?: boolean;
  setShowSheet?: (show: boolean) => void;
};

export const ServiceCard = ({
  service,
  showHeader,
  setShowSheet,
}: ServiceCardProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const isOwner = user?.id === service?.user?.id;
  return (
    <TouchableOpacity
      onPress={() => {
        if (setShowSheet) {
          setShowSheet(false);
        }
        router.push(`/app/services/${service.id}`);
      }}
    >
      <XStack
        theme={'accent'}
        backgroundColor={isOwner ? '#EFFEF6' : '#F1F2F4'}
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
            backgroundColor="#EFFEF6"
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
            <Stack
              padding="$2"
              borderRadius={'$6'}
              borderWidth={1}
              borderColor="$color0"
            >
              <CustomIcon name="image-blank" size={90} color="$color2" />
            </Stack>
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
          <TextInfo
            icon={<Building2 size={15} color="$color11" />}
            title={service?.description || ''}
            flex={1}
            color="$color11"
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
              <TextInfo
                icon={<MapPin size={15} color="$color11" />}
                title={service.city}
                color="$color11"
                textAlign="left"
              />
            )}
            <TextInfo
              icon={<Clock size={15} color="$color11" />}
              title={'منذ ساعة'}
              color="$color11"
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
                backgroundColor: 'gray',
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
