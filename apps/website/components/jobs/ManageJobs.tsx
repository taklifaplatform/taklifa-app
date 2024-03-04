import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Button, Image, Stack, Text, Theme, YStack } from 'tamagui';
export function ManageJobs() {
  const router = useRouter();
  return (
    <Theme name="light">
      <YStack
        $md={{ display: 'none' }}
        justifyContent="center"
        marginBottom="$3"
      >
        <Image
          alt="Banner"
          source={{
            uri: '/images/banner-5.png',
            width: '100%',
            height: 196,
          }}
          resizeMode="contain"
        />
        <YStack
          pos={'absolute'}
          flexDirection="column"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          w={'100%'}
          height={'100%'}
          gap="$4"
        >
          <Button
            backgroundColor="transparent"
            borderRadius={10}
            padding="$2"
            w={164}
            position="absolute"
            borderWidth={1}
            borderColor="$color10"
            left={'20px'}
            icon={<CustomIcon name="account" size="$2" />}
          >
            <Text color="$black" fontWeight="600" fontSize="$4">
              {t('web-home:signup')}
            </Text>
          </Button>
          <Stack width={'60%'} flexDirection='column'  gap='$4' justifyContent='center' alignItems='center'>
          <Text fontWeight="700" fontSize={30} textAlign='center' $lg={{ fontSize: 20}}>
            {t('job:job-title')}
          </Text>
          <Text fontWeight="400" fontSize="$4" textAlign='center'>
            {t('job:job-description')}
          </Text>
          </Stack>
        </YStack>
      </YStack>
      <YStack
        $gtMd={{ display: 'none' }}
        justifyContent="center"
        alignItems="center"
        backgroundColor={'$color5'}
        borderRadius={10}
        paddingVertical="$5"
        paddingHorizontal="$4"
        marginBottom="$3"
      >
        <YStack
          alignItems="center"
          justifyContent="center"
          w={'60%'}
          height={'100%'}
          gap="$3"
          $xs={{ w: '100%' }}
        >
          <Text fontWeight="bold" fontSize={15} textAlign="center">
          {t('job:job-title')}
          </Text>
          <Text fontWeight="400" fontSize={10} textAlign="center">
          {t('job:job-description')}
          </Text>
          <Button
            onPress={() => router.push('/auth/login')}
            backgroundColor="transparent"
            borderRadius={10}
            padding="$2"
            width={'100%'}
            borderWidth={1}
            borderColor="$color10"
            iconAfter={<CustomIcon name="account" size="$1" />}
          >
            <Text color="$black" fontWeight="600" fontSize={10}>
              {t('web-home:signup')}
            </Text>
          </Button>
        </YStack>
      </YStack>
    </Theme>
  );
}
