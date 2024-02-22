import { Button, Separator, XStack, YStack, Image, Text } from '@zix/app/ui/core'
import { CustomIcon } from '@zix/app/ui/icons'
import { X } from '@tamagui/lucide-icons'

export type DriverCardProps = {
    item: any,
    setShowCarousel: (show: boolean) => void,
    setSelectedMarker: (marker: any) => void
}

export const DriverCard : React.FC<DriverCardProps> = ({ item, setShowCarousel, setSelectedMarker }) => {

    const onCancell = () => {
        setShowCarousel && setShowCarousel(false);
        setSelectedMarker && setSelectedMarker({});
    }
    return (
        <YStack
            backgroundColor={'$color1'}
            borderRadius={'$5'}
            gap='$2'
        >
            <XStack justifyContent='space-between' padding='$4'>
                <XStack alignItems='center' gap='$2'>
                    <Image
                        source={{ uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1434' }}
                        width={50}
                        height={50}
                        borderRadius={50}
                        zIndex={1}
                        borderWidth={3}
                        borderColor={'#34C759'}
                    />
                    <YStack alignItems='flex-start'>
                        <Text
                            color={'$black'}
                            fontWeight='bold'
                        >فلان بن فلان</Text>
                        <Text
                            color={'$gray10'}
                        >متواجد الان</Text>
                    </YStack>
                </XStack>
                <Button
                    backgroundColor={'$gray6'}
                    width={34}
                    size={'$3'}
                    borderRadius={'$5'}
                    icon={<X size='$1' />}
                    onPress={() => onCancell()}
                />
            </XStack>
            <XStack justifyContent='space-between'
                paddingHorizontal='$4'
                borderBottomWidth={0.3}
                borderColor={'$gray8'}
                paddingBottom='$4'
            >
                <XStack alignItems='center' space='$2'>
                    <CustomIcon name='car' size={15} color='$color5' />
                    <Text
                        color={'$black'}
                        fontWeight='600'
                        fontSize='$1'
                    >هارلي دفيدسون {item?.id}</Text>
                </XStack>
                <Separator vertical borderColor='$gray10' borderWidth={0.3} />
                <XStack alignItems='center' space='$2'>
                    <CustomIcon name='star' size={15} color='$color5' />
                    <Text
                        color={'$black'}
                        fontWeight='600'
                        fontSize='$1'
                    >الرياض - 12 كم</Text>
                </XStack>
                <Separator vertical borderColor='$gray10' borderWidth={0.3} />
                <XStack alignItems='center' space='$2'>
                    <CustomIcon name='star' size={15} color='$color5' />
                    <Text
                        color={'$black'}
                        fontWeight='600'
                        fontSize='$1'
                    >(188) 4.8</Text>
                </XStack>

            </XStack>
            <XStack justifyContent='space-between'
                padding='$2'
            >
                <Button
                    backgroundColor={'$color5'}
                    size={'$3'}
                    borderRadius={'$3'}
                    fontWeight='400'
                    icon={<CustomIcon name='followed' size='$1' />}
                >
                    ارسال الدعوة
                </Button>
                <Button
                    backgroundColor={'$gray7'}
                    size={'$3'}
                    borderRadius={'$3'}
                    paddingVertical='$2'
                    width='28%'
                    fontWeight='400'
                    icon={<CustomIcon name='chat' size='$1' />}
                >
                    محادثة
                </Button>
                <Button
                    backgroundColor={'$gray7'}
                    size={'$3'}
                    borderRadius={'$3'}
                    width='28%'
                    fontWeight='400'
                    icon={<CustomIcon name='call' size='$1' />}
                >
                    اتصل
                </Button>
            </XStack>

        </YStack>
    )
}


export default DriverCard;