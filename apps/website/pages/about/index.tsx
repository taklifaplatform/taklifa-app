import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ManageShipments } from 'apps/website/components/web-home/management-shipments/ManageShipments';
import { Partner } from 'apps/website/components/web-home/partner/Partner';
import { MainLayout } from 'apps/website/layouts/MainLayout';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Image, Stack, Text, XStack, YStack } from 'tamagui';

import { NextPageWithLayout } from '../_app';

type WelcomeTextProps = {
  title: string;
  incon: string;
  text: string;
};

export const Page: NextPageWithLayout = () => {
  const [press, setPress] = useState('');
  const { activeLang } = useMultiLang();
  const router = useRouter();
  const renderImageBackground = () => (
    <>
      <Image
        alt="Banner"
        source={{
          uri: `/images/banner-6.png`,
        }}
        width={'100%'}
        height={466}
        resizeMode="cover"
        position="responsive"
        $sm={{
          height: 300,
        }}
        borderRadius={10}
      />
    </>
  );
  const renderbannerAbout = () => (
    <YStack
      position="absolute"
      top={0}
      justifyContent="center"
      alignItems="flex-start"
      paddingRight={400}
      paddingLeft={60}
      width="100%"
      gap="$7"
      marginVertical="$7"
      $sm={{
        paddingRight: 10,
        paddingLeft: 10,
        gap: '$1',
      }}
    >
      <Text
        fontSize={25}
        fontWeight="900"
        lineHeight={40}
        color="$color12"
        $sm={{
          fontSize: 15,
          lineHeight: 20,
        }}
      >
        {t('about:section-1:title-1')}
      </Text>
      <YStack
        gap="$7"
        paddingRight={65}
        $sm={{
          gap: '$2',
          paddingRight: 5,
        }}
      >
        <Text
          fontSize={20}
          fontWeight="400"
          lineHeight={40}
          $sm={{
            fontSize: 15,
            lineHeight: 15,
          }}
        >
          {t('about:section-1:description')}
        </Text>
        <XStack
          gap="$4"
          $sm={{
            gap: '$2',
            paddingRight: 5,
            marginTop: 20,
          }}
        >
          <ZixLinkButton
            width={150}
            height={35}
            icon={<CustomIcon name="account" size={15} />}
            href={'/'}
            $sm={{
              width: 120,
              height: 25,
            }}
          >
            <Text
              fontSize={10}
              $sm={{
                fontSize: 10,
              }}
            >{t('about:section-1:signup')}</Text>
          </ZixLinkButton>
          <ZixLinkButton
            onpress={() => setPress('contact')}
            backgroundColor={setPress === 'contact' ? '$color5' : '$color2'}
            href={'/'}
            width={150}
            height={35}
            icon={<CustomIcon name="call" size={15} />}
            $sm={{
              width: 120,
              height: 25,
            }}
          >
            <Text
              fontSize={10}
              $sm={{
                fontSize: 10,
              }}
            > {t('about:section-1:call')}
            </Text>
          </ZixLinkButton>
        </XStack>
      </YStack>
    </YStack>
  );
  const renderWelcomeText = () => (
    <Stack
      gap="$4"
      marginTop="$7"
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
      $sm={{
        flexDirection: "column",
      }}
    >
      <YStack
        gap="$7"
        padding="$7"
        marginTop="$7"
        width={900}
        $sm={{
          padding: "$2",
          gap: "$2",
          width: 282,
        }}
      >
        <Text
          fontSize={30}
          fontWeight="800"
          $sm={{
            fontSize: 14,
          }}
        >
          {t('about:section-2:title')}
        </Text>
        <Text
          fontSize={20}
          lineHeight={28}
          $sm={{
            fontSize: 15,
            lineHeight: 15,
          }}
        >
          {t('about:section-2:description')}
        </Text>
      </YStack>
      <XStack>
        <Image
          alt="Banner"
          source={{
            uri: `/images/team1_Plan.png`,
          }}
          width={315}
          height={315}
          resizeMode="cover"
          position="responsive"
          $sm={{
            height: 200,
            width: 200,
          }}
        />
      </XStack>
    </Stack>
  );
  const renderAboutServiceCard = ({ title, incon, text }: WelcomeTextProps) => (
    <YStack
      backgroundColor="$color3"
      width={300}
      height={380}
      borderRadius={10}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      gap="$7"
      $sm={{
        width: 250,
        height: 250,
        gap: '$5',
        padding: "$3"
      }}
    >
      <CustomIcon
        name={incon}
        size={50}
        $sm={{
          size: 10,
        }}
        color="$color5"
      />
      <Text
        fontSize={25}
        fontWeight="700"
        textAlign="center"
        $sm={{
          fontSize: 20,
        }}
      > {title}</Text>
      <Text
        fontSize={20}
        textAlign="center"
        fontWeight="400"
        $sm={{
          fontSize: 15,
        }}
      > {text}</Text>
    </YStack>
  );
  const renderAboutsServiceCards = () => (
    <Stack
      gap="$4"
      marginTop="$7"
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
      $sm={{
        flexDirection: "row",
      }}
    >
      {renderAboutServiceCard(
        {
          title: `${t('about:service-1:title-1')}`,
          incon: "bolt",
          text: `${t('about:service-1:description-1')}`
        }
      )}
      {renderAboutServiceCard(
        {
          title: `${t('about:service-1:title-2')}`,
          incon: "touch_app",
          text: `${t('about:service-1:description-2')}`
        }
      )}
      {renderAboutServiceCard(
        {
          title: `${t('about:service-1:title-3')}`,
          incon: "category",
          text: `${t('about:service-1:description-3')}`
        }
      )}
      {renderAboutServiceCard(
        {
          title: `${t('about:service-1:title-4')}`,
          incon: "shield_with_heart",
          text: `${t('about:service-1:description-4')}`
        }
      )}
    </Stack>
  );
  const renderTextStartToday = () => (
    <YStack
      pos={'absolute'}
      width={'70%'}
      gap="$4"
      padding="$4"
      $sm={{
        gap: '$0.25',
        padding: "$1"
      }}
    >
      <Text
        fontWeight="400"
        fontSize={25}
        lineHeight={40}
        textAlign={activeLang === 'en' ? 'left' : 'right'}
        $md={{
          fontSize: 15,
          lineHeight: 15,
          paddingBottom: '$5',
        }}
        $sm={{
          fontSize: 10,
          lineHeight: 10,
        }}
      >
        {t('about:section-3:description')}
      </Text>
      <Text
        fontWeight="600"
        fontSize={20}
        marginTop="$12"
        $sm={{
          fontSize: 10,
          paddingBottom: '$1',
          marginTop: 0,
        }}
      >
        {t('web-home:download')}
      </Text>
      <Stack
        flexDirection="row"
        gap="$2"
        $gtSm={{ display: 'none' }}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="google_play" size={'$9'} />
        </Pressable>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="app_store" size={'$9'} />
        </Pressable>
      </Stack>
      <Stack flexDirection="row" gap="$4" $sm={{ display: 'none' }}>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="google_play" size={'$14'} />
        </Pressable>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="app_store" size={'$14'} />
        </Pressable>
      </Stack>
    </YStack>
  );
  return (
    <YStack
    >
      {renderImageBackground()}
      {renderbannerAbout()}
      {renderWelcomeText()}
      {renderAboutsServiceCards()}
      <XStack
        marginVertical="$7"
      >
        <Image
          alt="Banner"
          source={{
            uri: `/images/bi5tisar-1-${activeLang}.png`,
          }}
          width={'100%'}
          height={413}
          resizeMode="cover"
          position="responsive"
          $sm={{
            height: 120,
            marginTop: 90,
          }}
          borderRadius={10}
        />
        {renderTextStartToday()}
      </XStack>
      <Partner />
      <ManageShipments />
    </YStack>
  );
};
Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;