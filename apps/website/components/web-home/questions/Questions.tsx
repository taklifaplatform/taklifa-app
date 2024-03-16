import { ChevronDown } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { FaqsService } from '@zix/api';
import { ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Accordion, Paragraph, Square, Text, XStack, YStack } from 'tamagui';

export function Questions() {
  const { data } = useQuery({
    queryKey: ['FaqsService.fetchListFaqs'],
    queryFn: () => {
      return FaqsService.fetchListFaqs();
    },
  });

  const renderZixAccordion = ({ item, index }) => (
    <Accordion
      key={index}
      overflow="hidden"
      width="70%"
      type="multiple"
      marginBottom={-40}
      $sm={{ width: '100%', marginBottom: -10 }}
    >
      <Accordion.Item value="a1" key={index}>
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
          borderColor={'transparent'}
          backgroundColor={'$gray4'}
          borderRadius={'$4'}
        >
          {({ open }) => (
            <>
              <Paragraph numberOfLines={1}>{item.title}</Paragraph>
              <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="ignore-css">${item.content}</div>`,
            }}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      borderRadius="$4"
      marginTop="$10"
      marginBottom="$10"
      gap="$8"
      $sm={{ gap: '$4', marginTop: '$2', marginBottom: '$4' }}
    >
      <XStack
        alignItems="center"
        gap="$2"
        paddingVertical="$4"
        $md={{ gap: '$1', paddingVertical: '$1' }}
      >
        <Text
          fontWeight="800"
          fontSize={30}
          textAlign="center"
          $md={{
            fontSize: 15,
          }}
        >
          {t('web-home:questiontitle')}
        </Text>
        <ZixLinkButton
          display="linkItem"
          href={'/'}
          iconAfter={
            <CustomIcon name="large_arrow_right" size="$1" color="$gray10" />
          }
          alignItems="center"
        />
      </XStack>

      {data?.data?.map((item, index) => renderZixAccordion({ item, index }))}
    </YStack>
  );
}
