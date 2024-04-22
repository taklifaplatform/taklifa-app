import {
  ChevronDown,
  ChevronLeft
} from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Accordion, Button, Image, Paragraph, Square, Stack, Text, Tooltip, View, XStack, YStack } from 'tamagui';
import { MainLayout } from '../../layouts/main-layout';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  const renderFirstSection = () => (
    <Stack
      backgroundColor="$color5"
      borderRadius={10}
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
      <Image
        alt="Banner"
        source={{
          uri: `/images/banner-10.png`,
        }}
        width={'45%'}
        height={466}
        resizeMode="cover"
        position="responsive"
        $sm={{
          height: 300,
          width: '100%',
        }}
      />
      <YStack
        justifyContent="center"
        alignItems="flex-start"
        width={'50%'}
        gap="$7"
        marginVertical="$7"
        $sm={{
          width: '100%',
          padding: "$2",
          gap: "$2",
        }}
      >
        <Text
          fontSize={25}
          fontWeight="900"
          lineHeight={40}
          color="$color11"
          $sm={{
            fontSize: 20,
            lineHeight: 20,
          }}
        >
          {t('comercial:section-1:title-1')}
        </Text>
        <Text
          fontSize={20}
          fontWeight="400"
          lineHeight={40}
          $sm={{
            fontSize: 12,
            lineHeight: 25,
          }}
        >
          {t('comercial:section-1:description')}
        </Text>
        <Stack
          gap="$4"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          flexWrap="wrap"
          width={'100%'}
          $sm={{
            flexDirection: "column",
          }}
        >
          <Button
            icon={<CustomIcon name="account" size={15} />}
            width={'40%'}
            $sm={{
              width: '100%',
            }}
          >
            {t('comercial:section-1:signup')}
          </Button>
          <Button
            borderColor="$color11"
            variant="outlined"
            icon={<CustomIcon name="call" size={15} />}
            width={'40%'}
            $sm={{
              width: '100%',
            }}
          >
            {t('comercial:section-1:call')}
          </Button>
        </Stack>
      </YStack>
    </Stack>
  )
  const renderWelcomeText = () => (
    <Stack

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
        width={'70%'}
        $sm={{
          padding: "$1",
          gap: "$5",
          width: '100%',

        }}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <Button iconAfter={ChevronLeft} >
              الحوكمة والإجراءات لمنح امتياز شركة سواعد اللوجستية
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content
            enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            scale={1}
            x={0}
            y={0}
            opacity={1}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          >
            <Tooltip.Arrow />
            <Paragraph
              size="$2"
              lineHeight="$1"
              backgroundColor={'$color3'}
              width={300}
              color={'$color11'}
              padding="$2"
              borderRadius={10}
            >
              إذا كنت تطمح لامتلاك شركة ناجحة وترتكز على خبرات وقوة واحدة من العلامات التجارية العالمية المرموقة،
              يمكنك التقدم الآن بطلب لبدء إجراءات الحصول على امتياز تجاري من شركة  سواعد اللوجستية. نتطلع إلى استقطاب رواد أعمال مبتكرين وملتزمين في جميع الأسواق بهدف بناء وتعزيز محفظتنا من الامتيازات التجارية طويلة الأمد.
            </Paragraph>
          </Tooltip.Content>
        </Tooltip>
        <Text
          fontSize={30}
          fontWeight="800"
          $sm={{
            fontSize: 14,
          }}
        >
          {t('comercial:section-2:title-1')}
        </Text>
        <Text
          fontSize={20}
          lineHeight={28}
          $sm={{
            fontSize: 15,
            lineHeight: 15,
          }}
        >
          {t('comercial:section-2:description-1')}
        </Text>
        {/* <Text
          fontSize={30}
          fontWeight="800"
          $sm={{
            fontSize: 14,
          }}
        >
          {t('comercial:section-2:title-2')}
        </Text> */}
        {/* <Text
          fontSize={20}
          lineHeight={28}
          $sm={{
            fontSize: 15,
            lineHeight: 15,
          }}
        >
          {t('comercial:section-2:description-2')}
        </Text> */}
      </YStack>
      <XStack
        width={'30%'}
        justifyContent='center'
      >
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-11.png`,
          }}
          width={315}
          height={315}
          resizeMode="cover"
          position="responsive"
          $sm={{
            width: 250,
            height: 150,
          }}
        />
      </XStack>
    </Stack>
  );
  const renderWelcomeText2 = () => (
    <Stack
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
        width={'70%'}
        $sm={{
          padding: "$1",
          gap: "$5",
          width: '100%',
        }}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <Button iconAfter={ChevronLeft} >
              الحوكمة والإجراءات لمنح امتياز شركة سواعد اللوجستية
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content
            enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            scale={1}
            x={0}
            y={0}
            opacity={1}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          >
            <Tooltip.Arrow />
            <Paragraph
              size="$2"
              lineHeight="$1"
              backgroundColor={'$color3'}
              width={300}
              color={'$color11'}
              padding="$2"
              borderRadius={10}
            >
              إذا كنت تطمح لامتلاك شركة ناجحة وترتكز على خبرات وقوة واحدة من العلامات التجارية العالمية المرموقة،
              يمكنك التقدم الآن بطلب لبدء إجراءات الحصول على امتياز تجاري من شركة  سواعد اللوجستية. نتطلع إلى استقطاب رواد أعمال مبتكرين وملتزمين في جميع الأسواق بهدف بناء وتعزيز محفظتنا من الامتيازات التجارية طويلة الأمد.
            </Paragraph>
          </Tooltip.Content>
        </Tooltip>
        <Text
          fontSize={30}
          fontWeight="800"
          $sm={{
            fontSize: 14,
          }}
        >
          {t('comercial:section-2:title-2')}
        </Text>
        <Text
          fontSize={20}
          lineHeight={28}
          $sm={{
            fontSize: 15,
            lineHeight: 15,
          }}
        >
          {t('comercial:section-2:description-2')}
        </Text>
      </YStack>
      <XStack
        width={'30%'}
        justifyContent='center'
      >
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-12.png`,
          }}
          width={315}
          height={315}
          resizeMode="cover"
          position="responsive"
          $sm={{
            width: 250,
            height: 150,
          }}
        />
      </XStack>
    </Stack>
  );
  const renderZixAccordion = ({ title, text }) => (
    <Accordion
      key={title}
      overflow="hidden"
      width="100%"
      type="multiple"
      marginBottom={-40}

      $sm={{ width: '100%', marginBottom: -10 }}
    >
      <Accordion.Item value="a1" key={title}>
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
          borderColor={'transparent'}

          borderRadius={'$4'}
        >
          {({ open }) => (
            <>
              <Text
                numberOfLines={2}
                fontSize={20}
                $sm={{ fontSize: 12 }}
              >
                {title}
              </Text>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content
          backgroundColor="$color2"
        >
          {text}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
  const renderCard = () => (
    <Stack
      gap="$4"
      width={'100%'}
      marginTop="$7"
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
      $sm={{
        flexDirection: "column",
      }}
    >
      <View
        alignItems='center'
        gap="$5"
        height={500}
        width={'30%'}
        backgroundColor={'$color2'}
        $sm={{
          width: '100%',
          height: 250,
        }}

      >
        {renderZixAccordion({
          title: `${t('about:service-1:title-1')}`,
          text: `${t('about:service-1:description-1')}`
        })}
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-13.png`,
          }}
          width={315}
          height={315}
          resizeMode="contain"
          position="responsive"
          $sm={{
            width: '100%',
            height: 150,
          }}
        />
      </View>
      <View
        alignItems='center'
        gap="$5"
        height={500}
        width={'30%'}
        backgroundColor={'$color2'}
        $sm={{
          width: '100%',
          height: 250,
        }}
      >
        {renderZixAccordion({
          title: `${t('about:service-1:title-2')}`,
          text: `${t('about:service-1:description-2')}`
        })}
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-14.png`,
          }}
          width={315}
          height={315}
          resizeMode="cover"
          position="responsive"
          $sm={{
            width: '100%',
            height: 150,
          }}
        />
      </View>
      <View
        alignItems='center'
        gap="$5"
        height={500}
        width={'30%'}
        backgroundColor={'$color2'}
        $sm={{
          width: '100%',
          height: 250,
        }}
      >
        {renderZixAccordion({
          title: `${t('about:service-1:title-4')}`,
          text: `${t('about:service-1:description-4')}`
        })}
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-15.png`,
          }}
          width={315}
          height={315}
          resizeMode="cover"
          position="responsive"
          $sm={{
            width: '100%',
            height: 150,
          }}
        />
      </View>
    </Stack>
  );
  return (
    <YStack
      theme={'accent'}
    >
      {renderFirstSection()}
      <View>
        {renderWelcomeText()}
        {renderWelcomeText2()}
      </View>

      {renderCard()}

    </YStack>
  );
}

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
