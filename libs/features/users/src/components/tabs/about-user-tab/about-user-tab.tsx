import { DriverTransformer } from '@zix/api';
import { ZixWorkingHoursWidget } from '@zix/features/working-hours';
import { useAuth } from '@zix/services/auth';
import { MediaFile } from '@zix/ui/common';
import { ZixLocationInfoWidget, ZixWidgetContainer } from '@zix/ui/widgets';
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
  const { user: authUser } = useAuth()
  const { isServiceProvider, getUrlPrefix } = useAuth()

  const renderAbout = () => (isServiceProvider(user) && !!user.about?.length) && (
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
    <ZixLocationInfoWidget location={user.location} canEdit={authUser?.id === user?.id} />
  )

  const renderWorkingHours = () => (isServiceProvider(user) && user.working_hours_id) && (
    <ZixWorkingHoursWidget workingHourId={user.working_hours_id} canEdit={authUser?.id === user?.id} />
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
