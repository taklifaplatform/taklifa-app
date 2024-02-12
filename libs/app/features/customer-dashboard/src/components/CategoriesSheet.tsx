import { Text } from 'react-native'
import React from 'react'
import { Sheet, YStack } from '@zix/app/ui/core'

export function CategoriesSheet({
    showModal,
    setShowModal
} : {
    showModal: boolean,
    setShowModal: (show: boolean) => void
}) {
    return (
        <Sheet
            open={showModal}
            snapPoints={[30]}
            onOpenChange={setShowModal}
        >
            <Sheet.Overlay />
            <Sheet.Handle />
            <Sheet.Frame>
                <YStack
                alignItems='center'
                justifyContent='center'
                flex={1}
                >
                <Text>
                    Categories selector
                </Text>
                </YStack>
            </Sheet.Frame>
        </Sheet>
    )
}