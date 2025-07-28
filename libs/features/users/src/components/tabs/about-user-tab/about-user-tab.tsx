import { useToastController } from '@tamagui/toast';
import { useQueryClient } from '@tanstack/react-query';
import { LocationTransformer, UserService, UserTransformer } from '@zix/api';
import { ZixWorkingHoursWidget } from '@zix/features/working-hours';
import { useAuth } from '@zix/services/auth';
import { MediaFile } from '@zix/ui/common';
import { ZixLocationInfoWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React, { useRef } from 'react';
import { Dimensions, Platform } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';

import { Pencil } from '@tamagui/lucide-icons';
import { Button, Stack, Text, XStack, YStack } from 'tamagui';

export type AboutUserTabProps = {
  user: UserTransformer
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
    height: USER_CARD_HEIGHT,
    style: {
      width: USER_CARD_WIDTH,
    },
  } as const);
  const queryClient = useQueryClient();
  const toast = useToastController()

  async function onAddNewLocation(location: LocationTransformer) {
    try {
      await UserService.updateLocation({
        requestBody: {
          location_id: location.id
        }
      })
      queryClient.invalidateQueries({
        queryKey: ['DriversService.retrieveDriver', user.id]
      })
      return location.id
    } catch (error: any) {
      toast.show(error?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      return null
    }
  }
  const renderAbout = () => (!!user.about?.length || authUser?.id === user?.id) && (
    <XStack
      padding='$2'
      backgroundColor={'$color1'}
      borderRadius='$2'
      shadowColor={'$color2'}
      shadowOpacity={0.5}
    >
      <ZixWidgetContainer
        label={isServiceProvider(user) ? `${t('common:bio')}` : 'About'}
        collapsible
        labelPrepend={authUser?.id === user?.id && (
          <Button
            icon={Pencil} size='$2'
            onPress={() => router.push(`/app/account/settings/general`)}
          >
            {t('common:edit')}
          </Button>
        )}
      >
        <Text flex={1}>
          {user.about || 'N/A'}
        </Text>
      </ZixWidgetContainer>
    </XStack>
  )

  const renderPhoneNumber = () => (!!user.phone_number?.length || authUser?.id === user?.id) && (
    <XStack
      padding='$2'
      backgroundColor={'$color1'}
      borderRadius='$2'
      shadowColor={'$color2'}
      shadowOpacity={0.5}
    >
      <ZixWidgetContainer
        label={'الهاتف'}
        collapsible
        labelPrepend={authUser?.id === user?.id && (
          <Button
            icon={Pencil} size='$2'
            onPress={() => router.push(`/app/account/settings/general`)}
          >
            {t('common:edit')}
          </Button>
        )}
      >
        <Text flex={1} textAlign='left'>
          {user.phone_number || 'N/A'}
        </Text>
      </ZixWidgetContainer>
    </XStack>
  )

  const renderCompaniesCarousel = () => !!user?.companies?.length && (
    <ZixWidgetContainer label={t('common:work-with')}>
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

  const renderLocation = () => (!!user.location_id || authUser?.id === user?.id) && (
    <ZixLocationInfoWidget locationId={user.location_id} canEdit={authUser?.id === user?.id} onAddNewLocation={onAddNewLocation} />
  )

  const renderWorkingHours = () => (isServiceProvider(user) && user.working_hours_id) && (
    <ZixWorkingHoursWidget workingHourId={user.working_hours_id} canEdit={authUser?.id === user?.id} />
  )

  return Platform.OS === 'web' ? (
    <YStack gap='$2'>
      {renderAbout()}
      <XStack
        padding='$2'
        backgroundColor={'$color1'}
        borderRadius='$2'
        shadowColor={'$color2'}
        shadowOpacity={0.5}
      >
        {renderCompaniesCarousel()}
      </XStack>
      <XStack
        padding='$2'
        backgroundColor={'$color1'}
        borderRadius='$2'
        shadowColor={'$color2'}
        shadowOpacity={0.5}
      >
        {renderLocation()}
      </XStack>
      <XStack
        padding='$2'
        backgroundColor={'$color1'}
        borderRadius='$2'
        shadowColor={'$color2'}
        shadowOpacity={0.5}
      >
        {renderWorkingHours()}
      </XStack>
    </YStack>
  ) :
    <YStack gap='$2' >
      {renderAbout()}
      {renderPhoneNumber()}
      {renderCompaniesCarousel()}
      {renderLocation()}
      {renderWorkingHours()}
    </YStack >
    ;
}

export default AboutUserTab;
