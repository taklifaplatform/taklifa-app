import { useMultiLang } from '@zix/i18n';
import { t } from 'i18next';
import { Button, Image, Stack, Text, Theme } from 'tamagui';
import { ButtonItem } from '../../ButtonItem';

/**
 * /customer
 * /solo-driver
 * /company
 * @returns
 */
export function TopBanner() {
  const { activeLang } = useMultiLang();

  const renderImageBackground = () => (
    <Image
      alt="Banner"
      source={{
        uri: `/images/banner-1-${activeLang}.png`,
      }}
      width="100%"
      borderRadius='$4'
      resizeMode="cover"
      height={400}
    />
  );

  const renderText = () => (
    <>
      <Stack
        flexDirection="column"
        flexWrap="wrap"
        paddingHorizontal="$5"
        $sm={{
          paddingHorizontal: '$2',
        }}
      >
        <Text
          fontWeight="800"
          fontSize={36}
          paddingVertical="$4"
          textAlign="center"

          $sm={{
            fontSize: 20,
          }}
        >
          {t('web-home:banner-1')}
        </Text>
        <Text
          fontWeight="700"
          fontSize={14}
          textAlign="center"
          $xs={{
            fontSize: 10,
          }}
        >
          {t('web-home:content-1')}
        </Text>
      </Stack>
    </>
  );

  const renderButton = () => (
    <Stack
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      gap="$6"
      padding="$5"
      $sm={{ gap: '$3', padding: '$3', flexDirection: 'column', width: '100%', flexGrow: 1 }}
    >
      <Button size="$5" themeInverse> {t('web-home:company')}</Button>
      <Button size="$5" themeInverse variant="outlined" borderColor="$color1"> {t('web-home:singlecarrier')}</Button>
    </Stack>
  );

  const renderContainer = () => (
    <Stack
      flex={1}
      flexDirection="column"
      flexWrap="wrap"
      width={'100%'}
      position="absolute"
      justifyContent="center"
      alignItems="center"
      paddingVertical="$6"
      $lg={{
        paddingVertical: '$2',
      }}
    >
      {renderText()}
      {renderButton()}
    </Stack>
  );
  return (
    <Theme name="light">
      <Stack marginBottom="$3">
        {renderImageBackground()}
        {renderContainer()}
      </Stack>
    </Theme>
  );
}
