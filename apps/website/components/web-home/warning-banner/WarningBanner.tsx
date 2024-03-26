import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Button, Image, Stack, Text, YStack } from 'tamagui';

export function WarningBanner() {
  const router = useRouter();
  const renderOptionText = () => (
    <YStack
      alignItems="flex-start"
      gap="$2"
      $sm={{
        alignItems: 'center',
        gap: '$1',
      }}
    >
      <Text
        fontWeight="800"
        fontSize={29}
        textAlign="center"
        $xs={{
          fontSize: 15,
        }}
      >
        {t('web-home:warningtitle')}
      </Text>
      <Text
        fontWeight="400"
        fontSize={12}
        textAlign="left"
        lineHeight={50}
        $sm={{
          fontSize: 10,
          lineHeight: 20,
          paddingTop: '$1',
          textAlign: 'center',
        }}
      >
        {t('web-home:warningcontent')}
      </Text>
    </YStack>
  );
  return (
    <YStack
      justifyContent="center"
      alignItems="center"
      borderRadius={'$4'}
      height={'$14'}
      marginBottom={'$3'}
      $sm={{
        justifyContent: 'flex-start',
      }}
    >
      <Image
        alt="Banner"
        source={{
          uri: '/images/cheating.png',
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
        borderRadius={'$4'}
      />
      <Stack
        flexDirection="row"
        position="absolute"
        width={'100%'}
        justifyContent="space-around"
        $sm={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '$4',
          gap: '$2',
        }}
      >
        {renderOptionText()}
        <Button
          theme='error'
          href={'/client'}
          bg={'$color8'}
          $sm={{
            width: '100%',
          }}
        >
          <Text
            color={'$color1'}
          >
            {t('web-home:warningbtn')} v2
          </Text>
          <CustomIcon color={'$color1'} name="large_arrow_right" size="$1" />
        </Button>
      </Stack>
    </YStack>
  );
}
