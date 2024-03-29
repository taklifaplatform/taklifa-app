import { ChevronDown } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { FaqsService } from '@zix/api';
import { ZixInput } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useState } from 'react';
import { Accordion, Square, Text, YStack } from 'tamagui';

// rename to CommonQuestions


export function FrequentlyQuestions() {
    const { data } = useQuery({
        queryKey: ['FaqsService.fetchListFaqs'],
        queryFn: () => {
            return FaqsService.fetchListFaqs();
        },
    });
    const [search, setSearch] = useState('');
    const renderZixAccordion = ({ item, index }) => (
        <Accordion
            key={index}
            overflow="hidden"
            width="100%"
            type="multiple"
            marginBottom={-40}
            $sm={{ width: '100%', marginBottom: -10 }}
        >
            <Accordion.Item value="a1" key={index}>
                <Accordion.Trigger
                    flexDirection="row"
                    justifyContent="space-between"
                    borderColor={'transparent'}
                    backgroundColor={'$color2'}
                    borderRadius={'$4'}
                >
                    {({ open }) => (
                        <>
                            <Text
                                numberOfLines={2}
                                fontSize={20}
                                $sm={{ fontSize: 12 }}
                            >
                                {item.title}
                            </Text>
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
            width="100%"
            $sm={{ gap: '$4', marginTop: '$2', marginBottom: '$4' }}
        >
            <YStack
                alignItems="center"
                gap="$2"
                $md={{ gap: '$1', paddingVertical: '$1' }}
                marginVertical="$4"
            >
                <Text
                    fontWeight="800"
                    fontSize={30}
                    textAlign="center"
                    $md={{
                        fontSize: 18,
                    }}
                >
                    {t('about:section-question-1:title-1')}
                </Text>
                <Text
                    fontSize={20}
                    textAlign="center"
                    fontWeight="400"
                    $md={{
                        fontSize: 12,
                    }}
                >
                    {t('about:section-question-1:title-2')}
                </Text>
            </YStack>
            <ZixInput
                rightIcon={() => <CustomIcon name="search" size="$1" />}
                placeholder={t('job:search')}
                borderColor={'$color12'}
                onChangeText={(text) => setSearch(text)}
                value={search}
                backgroundColor='transparent'
                containerProps={{
                    width: '100%',
                }}
            />
            {data?.data?.map((item, index) => renderZixAccordion({ item, index }))}
        </YStack>
    );
}
