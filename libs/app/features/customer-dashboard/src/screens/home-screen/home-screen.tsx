import { CustomIcon } from '@zix/app/ui/icons';
import { IMarker, MapVehicleMarker } from '@zix/app/ui/sawaeed';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import type { Region } from 'react-native-maps';
import MapView from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel';
import { Button, ScrollView, View, YStack } from 'tamagui';
import { CategorieButton } from '../../components/CategorieButton';
import { CategoriesSheet } from '../../components/CategoriesSheet';
import { DriverCard } from '../../components/DriverCard';
import { ViewDriverSheet } from '../../components/ViewDriverSheet';


import { ViewDriverSheet } from '../../components/ViewDriverSheet';


import { ViewDriverSheet } from '../../components/ViewDriverSheet';


/* eslint-disable-next-line */
export interface HomeScreenProps { }

const vehicleTypes = ['vehicle_a', 'vehicle_b', 'vehicle_c'];

const initialCamera = {
  center: {
    latitude: 24.713552,
    longitude: 46.675296
  },
  pitch: 0,
  heading: 0,
  altitude: 100000,
  zoom: 20
};

export function HomeScreen(props: HomeScreenProps) {

  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [selectedMarker, setSelectedMarker] = useState({} as IMarker);
  const [showModal, setShowModal] = useState(false)
  const [showMap, setShowMap] = useState(true)
  const [showCategorieModal, setShowCategorieModal] = useState(false)
  const { width } = Dimensions.get('window');
  const markers = [
    {
      id: 1,
      vehicle_type: 'vehicle_a',
      coordinate: {
        latitude: 20.713552,
        longitude: 40.675296
      }
    },
    {
      id: 2,
      vehicle_type: 'vehicle_b',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 3,
      vehicle_type: 'vehicle_c',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 4,
      vehicle_type: 'vehicle_a',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 5,
      vehicle_type: 'vehicle_b',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 6,
      vehicle_type: 'vehicle_c',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 7,
      vehicle_type: 'vehicle_a',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 8,
      vehicle_type: 'vehicle_b',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 9,
      vehicle_type: 'vehicle_c',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 10,
      vehicle_type: 'vehicle_a',
      coordinate: {
        latitude: 23.713552,
        longitude: 47.675296
      }
    },
    {
      id: 11,
      vehicle_type: 'vehicle_b',
      coordinate: {
        latitude: 22.713552,
        longitude: 45.675296
      }
    },
    {
      id: 12,
      vehicle_type: 'vehicle_c',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
    {
      id: 13,
      vehicle_type: 'vehicle_a',
      coordinate: {
        latitude: 24.813552,
        longitude: 46.675296
      }
    },
    {
      id: 14,
      vehicle_type: 'vehicle_b',
      coordinate: {
        latitude: 24.713552,
        longitude: 46.675296
      }
    },
  ]
  const categories = [
    {
      id: 1,
      name: 'الكل',
      icon: 'all',
      selected: true
    },
    {
      id: 2,
      name: 'المتوفر',
      icon: 'available',
      selected: false
    },
    {
      id: 3,
      name: 'المشغول',
      icon: 'busy',
      selected: false
    },
    {
      id: 4,
      name: 'المتوقف',
      icon: 'stopped',
      selected: false
    },
    {
      id: 5,
      name: 'المتوقف',
      icon: 'stopped',
      selected: false
    },
    {
      id: 6,
      name: 'المتوقف',
      icon: 'stopped',
      selected: false
    }
  ]

  /* const moveMarkers = useCallback(() => {
     setMarkers((prev) =>
       prev.map((marker) => ({
         ...marker,
         rotateDegree: `${Math.random() * 20}deg`,
         coordinate: {
           latitude: marker.coordinate.latitude + (Math.random() - 0.5) * 0.005,
           longitude: marker.coordinate.longitude + (Math.random() - 0.5) * 0.005
         }
       }))
     );
   }, []);

   const setInitialMarkers = useCallback(() => {
     const newMarkers: IMarker[] = [];

     Array.from({ length: 15 }).forEach(() => {
       newMarkers.push({
         vehicle_type: vehicleTypes[Math.floor(Math.random() * 3)],
         coordinate: {
           latitude:
             initialCamera.center?.latitude + (Math.random() - 0.5) * 0.2,
           longitude:
             initialCamera.center?.longitude + (Math.random() - 0.5) * 0.2
         }
       });
     });
     Array.from({ length: 40 }).forEach(() => {
       newMarkers.push({
         vehicle_type: vehicleTypes[Math.floor(Math.random() * 3)],
         coordinate: {
           latitude:
             initialCamera.center?.latitude + (Math.random() - 0.5) * 5,
           longitude:
             initialCamera.center?.longitude + (Math.random() - 0.5) * 5
         }
       });
     });
    setMarkers(newMarkers);
   }, []);

   const $interval = useRef<NodeJS.Timeout>();
   useEffect(() => {
     if (Platform.OS === 'ios') {
       $interval.current = setInterval(() => {
         moveMarkers();
       }, 1000);
     }
     setInitialMarkers();
     return () => $interval.current && clearInterval($interval.current);
   }, [moveMarkers]);
 */

  //MAP

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const renderMap = () => (
    <MapView
      style={{ flex: 1 }}
      initialCamera={initialCamera}
      onRegionChange={setCurrentRegion}
      onPanDrag={() => setIsMoving(true)}
      onRegionChangeComplete={() => setIsMoving(false)}
    >
      {markers.map((marker, index) => (
        <MapVehicleMarker
          key={`key-${index}`}
          index={index}
          marker={marker}
          setSelectedMarker={setSelectedMarker}
          selectedMarker={selectedMarker}
          setShowModal={setShowModal}
          setSelectedMarkerIndex={setSelectedMarkerIndex}
          setShowCarousel={setShowCarousel}

        />
      ))}
    </MapView>
  )
  //List
  const renderList = () => (
    <YStack flex={1} backgroundColor={'$gray4'} alignItems='center'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        flex={1}
        marginTop='$11'
      >
        {
          markers.map((marker, index) => (
            <YStack
              marginBottom='$2'
            >
              <DriverCard />
            </YStack>
          ))
        }
      </ScrollView>
    </YStack>
  )
  //switch button Map / List
  const renderSwitcher = () => (
    <Button
      position='absolute'
      bottom='3%'
      left='3%'
      icon={<CustomIcon name={showMap ? 'list' : 'map'} size='$2' />}
      fontWeight='600'
      fontSize='$2'
      size='$3'
      onPress={() => setShowMap(!showMap)}
    >
      {
        showMap ? 'القائمة' : 'الخريطة'

      }
    </Button>
  )
  // render carousel
  const [showCarousel, setShowCarousel] = useState(false)
  const renderCarouselItem = (
    { item, index }: {
      index: number;
      dataIndex: number;
      item: {
        id: string;
        image: string;
      };

    } | any,
  ) => {
    return (
      <View
        onPress={() => setShowModal(true)}
        padding='$2'
      >
        <DriverCard
          item={item}
          setShowCarousel={setShowCarousel}
          setSelectedMarker={setSelectedMarker}
        />
      </View>
    );
  }
  const renderCarousel = () => (
    <YStack
      position='absolute'
      bottom={/*isMoving ? '-10%' :*/ 1}
    >
      <Carousel
        loop={false}
        width={width}
        height={width / 2}
        autoPlay={false}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={renderCarouselItem}
      />
    </YStack>
  )

  return (
    <>
      <YStack flex={1}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          position='absolute'
          top={10}
          zIndex={1}
        >
          {
            categories.map((category, index) => (
              <CategorieButton
                index={index}
                category={category}
                setShowModal={setShowCategorieModal}
              />
            ))
          }
        </ScrollView>
        {
          showMap ? renderMap() : renderList()
        }
        {selectedMarker.id && showCarousel && renderCarousel()}
      </YStack>
      {!showCarousel && renderSwitcher()}

      <ViewDriverSheet
        setShowModal={setShowModal}
        showModal={showModal}
        markers={markers}
      />
      <CategoriesSheet
        showModal={showCategorieModal}
        setShowModal={setShowCategorieModal}
      />
    </>

  );
}



export default HomeScreen;
