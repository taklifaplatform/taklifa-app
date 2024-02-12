import React, { useRef, useState } from 'react'
import { Sheet, XStack, YStack, Text } from '@zix/app/ui/core'
import { DriverTap } from 'libs/app/features/account/src/components/profile-layout/DriverTap';
import { TruckTap } from 'libs/app/features/account/src/components/profile-layout/TruckTap';
import { RatingTap } from 'libs/app/features/account/src/components/profile-layout/RatingTap';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DriverCard } from './DriverCard';
import Carousel from 'react-native-snap-carousel';
import { ArrowBigUpDash } from '@tamagui/lucide-icons'

export function ViewDriverSheet(
    {
        setShowModal,
        showModal,
        markers
    }: {
        setShowModal: (show: boolean) => void,
        showModal: boolean,
        markers: []
    }
) {

    const [tap, setTap] = useState('driver')
    const carousel = useRef<Carousel>()

    const renderTaps = () => (
        <XStack
            justifyContent='space-between'
            padding='$4'
        >
            <TouchableOpacity
                onPress={() => setTap('driver')}
                style={[styles.tab, {
                    borderBottomWidth: tap === 'driver' ? 2 : 0.5,
                    borderColor: tap === 'driver' ? '#FECA16' : '#AFAFAF'

                }]}
            >
                <Text
                    fontWeight={tap === 'driver' ? 'bold' : '400'}
                >عن السائق</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTap('truck')}
                style={[styles.tab, {
                    borderBottomWidth: tap === 'truck' ? 2 : 0.5,
                    borderColor: tap === 'truck' ? '#FECA16' : '#AFAFAF'

                }]}>
                <Text
                    fontWeight={tap === 'truck' ? 'bold' : '400'}
                >عن الشاحنة</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTap('raiting')}
                style={[styles.tab, {
                    borderBottomWidth: tap === 'raiting' ? 2 : 0.5,
                    borderColor: tap === 'raiting' ? '#FECA16' : '#AFAFAF'

                }]}>
                <Text
                    fontWeight={tap === 'raiting' ? 'bold' : '400'}
                >التقييمات</Text>
            </TouchableOpacity>
        </XStack>
    )
    // const SCREEN_WIDTH = Dimensions.get('window').width;
    const scrollViewRef = useRef();

    const scrollToTop = () => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };

    const renderCard = () => (
        <YStack padding='$4' backgroundColor={'$color1'} flex={1}>
            <DriverCard item={null}
            setShowCarousel={setShowModal}
            />
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
            >
                {renderTaps()}
                <YStack
                    flex={1}
                >
                    {
                        tap === 'driver' ? <DriverTap /> : tap === 'truck' ? <TruckTap /> : <RatingTap />
                    }
                </YStack>
                <YStack height={'$15'} />

            </ScrollView>
            <TouchableOpacity
                onPress={() => scrollToTop()}
                style={styles.scrollbutton}
            >
                <ArrowBigUpDash size='$2' color='black' />
            </TouchableOpacity>
        </YStack>
    )

    return (
        <Sheet
            open={showModal}
            snapPoints={[90, 27]}
            onOpenChange={setShowModal}
        >
            <Sheet.Overlay />
            <Sheet.Handle />
            <Sheet.Frame>
                {renderCard()}
            </Sheet.Frame>
        </Sheet>
    )
}

const styles = StyleSheet.create({
    tab: {
        width: '34%',
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#AFAFAF'
    },
    scrollbutton: {
        backgroundColor: '#FECA16',
        borderRadius: 50,
        padding: 10,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    }
})