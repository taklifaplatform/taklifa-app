import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, Text, Separator, YStack, XStack, View } from '@zix/app/ui/core'
import { CustomIcon } from '@zix/app/ui/icons'
import { t } from 'i18next'

export function MobileDrawer() {
    return (
        <YStack gap="$2" padding='$4'
            alignItems='flex-start'
        >

            <View
                onPress={() => { }}
                flexDirection='row'
                alignItems='center'
                gap="$2"
                paddingVertical="$2"
            >
                <CustomIcon name={'homeinfo'} size="$2" />
                <Text color="$white">{t('web-home:home')}</Text>
            </View>
            <Separator
                width='100%'
                borderColor={'$gray7'}
            />
            <View
                onPress={() => { }}
                flexDirection='row'
                alignItems='center'
                gap="$2"
                paddingVertical="$2">
                <CustomIcon name={'help'} size="$2" />

                <Text color="$white">{t('web-home:question')}</Text>
            </View>
            <Separator
                width='100%'
                borderColor={'$gray7'}
            />
            <View
                onPress={() => { }}
                flexDirection='row'
                alignItems='center'
                gap="$2"
                paddingVertical="$2"
            >
                <CustomIcon name={'account'} size="$2" />

                <Text color="$white">{t('web-home:signup')}</Text>
            </View>
            <Separator
                width='100%'
                borderColor={'$gray7'}
            />
            <View
                onPress={() => { }}
                flexDirection='row'
                alignItems='center'
                gap="$2"
                paddingVertical="$2"
            >
                <CustomIcon name={'rigning'} size="$2" />

                <Text color="$white">{t('web-home:call')}</Text>
            </View>
            <Separator
                width='100%'
                borderColor={'$gray7'}
            />
            <View
                onPress={() => { }}
                flexDirection='row'
                alignItems='center'
                gap="$2"
                paddingVertical="$2"
            >
                <CustomIcon name={'search'} size="$2" />

                <Text color="$white">{t('web-home:search')}</Text>
            </View>
            <Separator
                width='100%'
                borderColor={'$gray7'}
            />

            <Text fontWeight={'500'} fontSize="$2">
                {t('web-home:followus')}
            </Text>
            <XStack gap="$2">
                <CustomIcon name={'facebook'} />
                <CustomIcon name={'instagram'} />
                <CustomIcon name={'snapchat'} />
            </XStack>
            <XStack gap="$2" alignItems="center">
                <Text fontWeight={'500'} fontSize="$2">
                    {t('web-home:download')}
                </Text>
                <XStack gap="$2">
                    <CustomIcon name={'appstore'} />
                    <CustomIcon name={'googleplay'} />
                </XStack>
            </XStack>
        </YStack>
    )
}