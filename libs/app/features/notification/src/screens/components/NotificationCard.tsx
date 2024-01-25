import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { XStack, YStack, Text } from '@zix/app/ui/core'
import { CustomIcon } from '@zix/app/ui/icons'
import { MoreHorizontal } from '@tamagui/lucide-icons'

export default function NotificationCard({
    item = {
        avatar: '',
        icon: '',
        title: '',
        time: ''
    }
}) {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
                backgroundColor: item.icon === 'notifications' ? '#FFFBED' : 'transparent',
                padding: 10
            }}
        >
            <XStack space='$3' width={'80%'}>
                {
                    item.avatar ? <Image source={{ uri: item.avatar }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                        }}
                    /> : <View style={{
                        backgroundColor: '#FFEEB2',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                        width: 40,
                        height: 40,
                    }}>
                        <CustomIcon name={item.icon} size={28} color={'#FECA16'} />
                    </View>
                }

                <YStack space='$1'>
                    <Text
                        textAlign='left'
                        fontWeight={'500'}
                    >{item.title}</Text>
                    <Text
                        color={'$gray9'}
                        fontWeight={'500'}
                    >{item.time}</Text>
                </YStack>
            </XStack>
            <MoreHorizontal size="$1" />
        </TouchableOpacity>
    )
}