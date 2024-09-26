import { UserCircle } from '@tamagui/lucide-icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Button, Image, Stack, Text, View, YStack } from 'tamagui';


export function ManageShipments() {
  const router = useRouter();

  return (
    <View>
      <YStack
        justifyContent="center"
        marginBottom="$8"
        width={'100%'}
      >
        <Image
          alt="Banner"
          source={{
            uri: '/images/banner-3.png',
          }}
          width={1260}
          height={180}
          resizeMode="cover"
          position="responsive"
          $sm={{
            width: '100%',
            height: 180
          }}
          $lg={{
            width: '100%',
            height: 180
          }}
          borderRadius={"$1"}
        />
        <Stack
          position={'absolute'}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          paddingRight={350}
          justifyContent="space-around"
          width={'100%'}
          height={'100%'}
          $sm={{
            flexDirection: 'row',
            paddingRight: 0,
            gap: 0,
          }}
          $lg={{
            flexDirection: 'row',
            paddingRight: 0,
            gap: 0,
          }}
        >
          <YStack
            theme={'accent'}
            gap={20}
            $sm={{
              gap: 10,
              width: '90%',
            }}
          >
            <Text
              fontWeight="800"
              fontSize="$9"
              $sm={{
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              {t('web-home:banner-4')}
            </Text>
            <Text
              fontWeight="400"
              fontSize="$4"
              $sm={{
                fontSize: 10,
                textAlign: 'center',
              }}
            >
              {t('web-home:content-4')}
            </Text>
          </YStack>
          <Button
            theme={'accent'}
            backgroundColor="transparent"
            borderRadius={"$1"}
            padding="$2"
            width={164}
            borderWidth={"$1"}
            borderColor="$color11"
            icon={<UserCircle size="$2" />}
            onPress={() => router.push('/contact')}
          >
            <Text fontWeight="600" fontSize={15}>
              {t('web-home:signup')}
            </Text>
          </Button>
        </Stack>
      </YStack>
    </View>
  );
}
