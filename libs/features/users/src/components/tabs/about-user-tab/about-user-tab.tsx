import { DriverTransformer } from '@zix/api';
import { ZixWorkingHoursWidget } from '@zix/features/working-hours';
import { useAuth } from '@zix/services/auth';
import { MediaFile } from '@zix/ui/common';
import { ZixLocationInfoWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';

import { Stack, Text, YStack } from 'tamagui';

export type AboutUserTabProps = {
  user: DriverTransformer
}

export const AboutUserTab: React.FC<AboutUserTabProps> = ({
  user
}) => {

  const USER_CARD_WIDTH = Dimensions.get('window').width;
  const USER_CARD_HEIGHT = 140;
  const router = useRouter()
  const { user: authUser } = useAuth()
  const { isServiceProvider, getUrlPrefix } = useAuth()
  const carouselRef = useRef<ICarouselInstance>(null);
  const baseOptions = ({
    vertical: false,
    width: USER_CARD_WIDTH / 2,
    height: USER_CARD_HEIGHT ,
    style: {
      width: USER_CARD_WIDTH,
    },
  } as const);

  const renderAbout = () => (!!user.about?.length) && (
    <ZixWidgetContainer label={isServiceProvider(user) ? 'About Driver' : 'About'}>
      <Text flex={1} color='black'>
        {user.about}
      </Text>
    </ZixWidgetContainer>
  )

  const renderCompaniesCarousel = () => !!user?.companies?.length && (
    <ZixWidgetContainer label='Works With'>
      <Carousel
        {...baseOptions}
        key={user?.companies.length}
        ref={carouselRef}
        autoPlay={true}
        scrollAnimationDuration={3000}
        data={user?.companies || []}
        renderItem={({ item }) => (
          <Stack
            key={item.id}
            onPress={() => router.push(`${getUrlPrefix}/companies/${item.id}`)}
            width='$12'
            height='$10'
            borderRadius='$2'
            overflow='hidden'
            justifyContent='center'
            alignItems='center'
          >
            {
              item?.logo?.url ? (
                <MediaFile
                  media={item.logo}
                  width='$12'
                  height='$10'
                />
              ) : (
                <Text fontWeight='bold'>{item.name}</Text>
              )
            }
          </Stack>
        )}
      />
    </ZixWidgetContainer>
  )

  const renderCompanies = () => !!user?.companies?.length && (
    <ZixWidgetContainer label='Works With'>
      <Stack
        flexDirection='row'
        flexWrap='wrap'
        gap='$4'
      >
        {
          user?.companies.map(company => (
            <Stack
              key={company.id}
              onPress={() => router.push(`${getUrlPrefix}/companies/${company.id}`)}
              width='$8'
              height='$4'
              borderRadius='$2'
              overflow='hidden'
            >
              {
                company?.logo?.url ? (
                  <MediaFile
                    media={company.logo}
                    width='$8'
                    height='$4'
                  />
                ) : (
                  <Text fontWeight='bold'>{company.name}</Text>
                )
              }
            </Stack>
          ))
        }
      </Stack>
    </ZixWidgetContainer>
  )

  const renderLocation = () => !!user.location && (
    <ZixLocationInfoWidget location={user.location} canEdit={authUser?.id === user?.id} />
  )

  const renderWorkingHours = () => (isServiceProvider(user) && user.working_hours_id) && (
    <ZixWorkingHoursWidget workingHourId={user.working_hours_id} canEdit={authUser?.id === user?.id} />
  )

  return (
    <YStack gap='$2'>
      {renderAbout()}
      {renderCompaniesCarousel()}
      {renderLocation()}
      {renderWorkingHours()}
    </YStack>
  );
}

export default AboutUserTab;
