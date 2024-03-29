import { useQuery } from '@tanstack/react-query';
import { CompanyMembersService, CompanyTransformer } from '@zix/api';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixLocationInfoWidget, ZixWidgetContainer, ZixWorkingHoursWidget } from '@zix/ui/widgets';
import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'solito/router';

import { Text, Theme, XStack, YStack } from 'tamagui';

export type AboutCompanyTabProps = {
  company: CompanyTransformer
}

export const AboutCompanyTab: React.FC<AboutCompanyTabProps> = ({
  company
}) => {
  const router = useRouter()
  const { getUrlPrefix } = useAuth()

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

  const renderLocation = () => !!company.location && (
    <ZixWidgetContainer label='Location'>
      <ZixLocationInfoWidget location={company.location} />
    </ZixWidgetContainer>
  )

  const renderWorkingHours = () => (
    <ZixWidgetContainer label='Working Hours'>
      <ZixWorkingHoursWidget />
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
              router.push(`${getUrlPrefix}/companies/${company.id}/employees/${item.id}`)
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
      {renderDriversList()}
      {renderLocation()}
      {renderWorkingHours()}
    </YStack>
  );
}

export default AboutCompanyTab;
