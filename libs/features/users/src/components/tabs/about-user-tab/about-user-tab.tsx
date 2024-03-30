import { DriverTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { MediaFile } from '@zix/ui/common';
import { ZixLocationInfoWidget, ZixWidgetContainer, ZixWorkingHoursWidget } from '@zix/ui/widgets';
import React from 'react';
import { useRouter } from 'solito/router';

import { Stack, Text, YStack } from 'tamagui';

export type AboutUserTabProps = {
  user: DriverTransformer
}

export const AboutUserTab: React.FC<AboutUserTabProps> = ({
  user
}) => {
  const router = useRouter()
  const { isServiceProvider, getUrlPrefix } = useAuth()

  const renderAbout = () => !!user.about?.length && (
    <ZixWidgetContainer label='About Driver'>
      <Text flex={1} color='black'>
        {user.about}
      </Text>
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
    <ZixWidgetContainer label='Location'>
      <ZixLocationInfoWidget location={user.location} />
    </ZixWidgetContainer>
  )

  const renderWorkingHours = () => isServiceProvider(user) && (
    <ZixWidgetContainer label='Working Hours'>
      <ZixWorkingHoursWidget />
    </ZixWidgetContainer>
  )

  return (
    <YStack gap='$2'>
      {renderAbout()}
      {renderCompanies()}
      {renderLocation()}
      {renderWorkingHours()}
    </YStack>
  );
}

export default AboutUserTab;
