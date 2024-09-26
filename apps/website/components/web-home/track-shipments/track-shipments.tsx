import { ArrowLeft } from '@tamagui/lucide-icons';
import { ZixInput } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Stack, Text, Theme, XStack, YStack } from 'tamagui';




export function TrackShipments() {
  const [selectedShipment, setSelectedShipment] = useState(0);
  const router = useRouter();
  const renderMethodShipment = () => (
    <XStack
      theme='accent'
      gap="$4"
      $sm={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={() => setSelectedShipment(1)}>
        <XStack
          alignItems="center"
          gap="$2"
          borderBottomWidth={selectedShipment === 1 ? 2 : 0}
          borderColor="$color5"
          paddingBottom="$2"
        >
          <CustomIcon
            name="search_track"
            color={selectedShipment === 1 ? '$color5' : '$color9'}
          />
          <Text
            color={selectedShipment === 1 ? '$color5' : '$color9'}
            fontSize={20}
            $sm={{
              fontSize: 12,
            }}
          >
            {t('web-home:searchshipment')}
          </Text>
        </XStack>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedShipment(0)}>
        <XStack
          alignItems="center"
          gap="$2"
          borderBottomWidth={selectedShipment === 0 ? "$1" : 0}
          borderColor="$color5"
          paddingBottom="$2"
        >
          <CustomIcon
            name="find_track"
            color={selectedShipment === 0 ? '$color5' : '$color9'}
          />
          <Text
            color={selectedShipment === 0 ? '$color5' : '$color12'}
            fontSize={20}
            $sm={{
              fontSize: 12,
            }}
          >
            {t('web-home:findshipment')}
          </Text>
        </XStack>
      </TouchableOpacity>
    </XStack>
  );
  return (
    <YStack
      alignItems="center"
      backgroundColor={'transparent'}
      borderRadius="$2"
      padding="$4"
      gap="$4"
      marginBottom="$4"
    >
      {renderMethodShipment()}
      <Stack
        width="100%"
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="row"
        flexWrap="wrap"
        gap="$4"
        $sm={{
          flexDirection: 'column',
        }}
      >
        <ZixInput
          backgroundColor={'transparent'}
          placeholder={t('web-home:shipmentplaceholder')}
          leftIcon={(props) => <CustomIcon {...props} name="flip" />}
          containerProps={{
            flex: 1,
            $sm: {
              width: '100%',
            },
          }}
        />
        <Button
          theme={'accent'}
          borderColor='$color9'
          backgroundColor='$color9'
          size="$5"
          onPress={() => router.push('/app')}
          iconAfter={<ArrowLeft size={'$1'} />}
          width="15%"
          $sm={{
            width: '100%',
          }}
        >
          {selectedShipment === 0 ? t('web-home:track') : t('web-home:send')}
        </Button>
        <Button
          borderColor="$color12"
          backgroundColor="$color1"
          size="$5"
          onPress={() => router.push('/app')}
          iconAfter={<ArrowLeft size={'$1'} />}
          width="15%"
          $sm={{
            width: '100%',
          }}
        >
          {selectedShipment === 0 ? t('web-home:realtrack') : t('web-home:realsend')}
        </Button>
      </Stack>
    </YStack>

  );
}
