import React from 'react';
import { XStack, YStack, Text } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { Plus } from '@tamagui/lucide-icons';
import { t } from 'i18next';

export function Questions() {
    const questions = [
        {
            title:
                'Can I change or cancel a pickup after scheduling an appointment online?'
        },
        {
            title:
                'Can I change or cancel a pickup after scheduling an appointment online?'
        },
        {
            title:
                'Can I change or cancel a pickup after scheduling an appointment online?'
        },
        {
            title:
                'Can I change or cancel a pickup after scheduling an appointment online?',
        }
    ];
    return (
        <YStack bottom={'-7%'} alignItems="center">
            <XStack alignItems="center" paddingVertical='$6' space="$4">
                <CustomIcon name="large_arrow_left" />
                <Text
                    fontWeight='bold'
                    fontSize='$6'
                >{t('web-home:questiontitle')}</Text>
            </XStack>
            {questions.map((item, index) => (
                <XStack
                    key={index}
                    marginTop='$2'
                    w={'70%'}
                    justifyContent="space-between"
                    paddingHorizontal="$2"
                    paddingVertical="$4"
                    backgroundColor={'$gray4'}
                    borderRadius={'$2'}
                    alignItems="center"
                >
                    <Text>{item.title}</Text>
                    <Plus size="$2" />
                </XStack>
            ))}
        </YStack>
    );
}
