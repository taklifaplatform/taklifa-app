import { MainLayout } from 'apps/website/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import { Stack, Text, View, YStack } from 'tamagui';
import { ContactScreen } from '@zix/features/contact-us';
import { t } from 'i18next';
import { CustomIcon } from '@zix/ui/icons';
import { ComplainScreen } from '@zix/features/complain';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{t('web-home:complaint')}</title>
      </Head>
      <Stack
      
      flexDirection='column'
      flexWrap='wrap'
        justifyContent="center"
        alignItems="center"
        paddingVertical="$8"
        gap="$2"
      >
        <CustomIcon name="alert" size={'$9'} color={'$red9'} />
        <Text fontSize={25} fontWeight={800} textAlign= 'center'  color={'$red9'} $sm={{ fontSize: 18, }}>
          {t('web-home:complain-text')}
        </Text>
        <View
        width={'70%'}
        $sm={{ width: '100%' }}
        backgroundColor={'$color1'}
        borderRadius={'$4'}
        paddingVertical={'$4'}
        marginTop={'$6'}
      >
        <ComplainScreen />
      </View>
      </Stack>
      
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
