import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'next/router';
import { Button, Image, Stack, Text, View, YStack } from 'tamagui';
import { FrequentlyQuestions } from '../../components/web-home/questions/FrequentlyQuestion';
import { MainLayout } from '../../layouts/MainLayout';
import { NextPageWithLayout } from '../_app';
import { t } from 'i18next';
export const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const renderBanner = () => (
    <YStack
      justifyContent="center"
      marginBottom="$8"
      width={'100%'}
      minHeight={180}
      backgroundColor="$color5"
      borderRadius='$4'
      overflow="hidden"
    >
      <Image
        alt="Banner"
        source={{
          uri: `/images/Rectangle.png`,
        }}
        width='100%'
        height={180}
        resizeMode="cover"
      />
      <Stack
        pos={'absolute'}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        paddingRight={350}
        gap={100}
        justifyContent="space-around"
        w={'100%'}
        height={'100%'}
        $sm={{
          flexDirection: 'row',
          paddingRight: 0,
          gap: 0,
        }}
      >
        <Text
          fontWeight="bold"
          fontSize={30}
          $sm={{
            fontSize: 20,
            textAlign: 'center',
            width: '100%',
          }}
        >
          {t('about:section-question-1:question')}
        </Text>
        <Button
          backgroundColor="transparent"
          borderRadius={10}
          padding="$2"
          w={164}
          borderWidth={1}
          borderColor="$color10"
          icon={<CustomIcon name="call" size="$2" />}
          onPress={() => router.push('/contact')}
        >
          <Text color="$color12" fontWeight="600" fontSize={15}>
            {t('about:section-question-1:call')}
          </Text>
        </Button>
      </Stack>
    </YStack>
  );

  return (
    <YStack
      gap="$8"
      justifyContent="center"
      alignItems="center"
    >
      <FrequentlyQuestions />
      {renderBanner()}
    </YStack>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;