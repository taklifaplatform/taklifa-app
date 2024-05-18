import { useQuery } from '@tanstack/react-query';
import { CompanyMembersService, CompanyTransformer } from '@zix/api';
import { ZixWorkingHoursWidget } from '@zix/features/working-hours';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixLocationInfoWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import React, { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';

import { Text, Theme, View, XStack, YStack } from 'tamagui';

export type AboutCompanyTabProps = {
  company: CompanyTransformer
}

export const AboutCompanyTab: React.FC<AboutCompanyTabProps> = ({
  company
}) => {
  const router = useRouter()
  const { getUrlPrefix, user: authUser } = useAuth()
  const carouselRef = useRef<ICarouselInstance>(null);
  const USER_CARD_WIDTH = Dimensions.get('window').width;
  const USER_CARD_HEIGHT = 140;
  const baseOptions = ({
    vertical: false,
    width: USER_CARD_WIDTH / 3,
    height: USER_CARD_HEIGHT ,
    style: {
      width: USER_CARD_WIDTH,
    },
  } as const);

  const { data } = useQuery({
    queryFn: () => CompanyMembersService.list({
      company: company.id as string,
      role: USER_ROLES.company_driver,
    }),
    queryKey: ['CompanyMembersService.list', company.id],
  })

  const renderAbout = () => !!company.about?.length && (
    <ZixWidgetContainer label='About Company'>
      <Text flex={1} color='black'>
        {company.about}
      </Text>
    </ZixWidgetContainer>
  )

  const renderLocation = () => (!!company.location_id) && (
    <ZixLocationInfoWidget locationId={company.location_id} canEdit={!!authUser?.companies?.find(c => c.id === company.id)} />
  )

  const renderWorkingHours = () => company.working_hours_id && (
    <ZixWorkingHoursWidget workingHourId={company.working_hours_id} canEdit={!!authUser?.companies?.find(c => c.id === company.id)} />
  )

  const renderDriversListCarousel = () => !!data?.data?.length && (
    <ZixWidgetContainer label='Drivers'>
      <Carousel
        {...baseOptions}
        key={data.data.length}
        ref={carouselRef}
        autoPlay={true}
        scrollAnimationDuration={3000}
        data={data.data || []}
        renderItem={({ item, index }) => (
          <YStack
            onPress={() => {
              router.push(`${getUrlPrefix}/users/${item.user?.id}`)
            }}
            key={`${item.id}-${index}`}
            marginRight='$4'
            backgroundColor='$color2'
            paddingVertical='$3'
            paddingHorizontal='$2'
            borderRadius='$4'
            alignItems='center'
            gap='$2'
            minWidth='$10'
          >
            <UserAvatar user={item.user} />
            <Text fontWeight='700' numberOfLines={1}>
              {item.user?.name}
            </Text>
            {
              item.user?.rating_stats?.count ? (
                <XStack height={'$1'} gap='$1'>
                  <Text>
                    ({item.user?.rating_stats?.count})
                    {' '}
                    {item.user?.rating_stats?.score}
                  </Text>
                  <Theme name='accent'>
                    <CustomIcon name='half_star' size={16} color='$color9' />
                  </Theme>
                </XStack>
              ): <View height={'$1'}/>
            }

          </YStack>
        )}
      />
    </ZixWidgetContainer>
  )

  const renderDriversList = () => !!data?.data?.length && (
    <ZixWidgetContainer label='Drivers'>
      <FlatList
        data={data.data}
        horizontal
        renderItem={({ item, index }) => (
          <YStack
            onPress={() => {
              router.push(`${getUrlPrefix}/users/${item.user?.id}`)
            }}
            key={`${item.id}-${index}`}
            marginRight='$4'
            backgroundColor='$color2'
            paddingVertical='$3'
            paddingHorizontal='$2'
            borderRadius='$4'
            alignItems='center'
            gap='$2'
            width='$10'
          >
            <UserAvatar user={item.user} />
            <Text fontWeight='700' numberOfLines={1}>
              {item.user?.name}
            </Text>
            {
              !!item.user?.rating_stats?.count && (
                <XStack gap='$1'>
                  <Text>
                    ({item.user?.rating_stats?.count})
                    {' '}
                    {item.user?.rating_stats?.score}
                  </Text>
                  <Theme name='accent'>
                    <CustomIcon name='half_star' size={16} color='$color9' />
                  </Theme>
                </XStack>
              )
            }

          </YStack>
        )}
        keyExtractor={(item) => item.id}
      />
    </ZixWidgetContainer>
  )
  return (
    <YStack gap='$2'>
      {renderAbout()}
      {renderDriversListCarousel()}
      {renderLocation()}
      {renderWorkingHours()}
    </YStack>
  );
}

export default AboutCompanyTab;
