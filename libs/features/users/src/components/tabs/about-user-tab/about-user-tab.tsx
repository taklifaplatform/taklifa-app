import { DriverTransformer, MediaTransformer } from '@zix/api';
import { ZixLocationInfoWidget, ZixMediasListWidget, ZixWidgetContainer, ZixWorkingHoursWidget } from '@zix/ui/widgets';
import React, { useMemo } from 'react';

import { Text, YStack } from 'tamagui';

export type AboutUserTabProps = {
  user: DriverTransformer
}

export const AboutUserTab: React.FC<AboutUserTabProps> = ({
  user
}) => {

  const companiesLogos = useMemo<MediaTransformer[]>(() => {
    const medias: MediaTransformer[] = []

    user?.companies?.forEach(company => {
      if (company?.logo) {
        medias.push(company.logo)
      }
    })

    return medias;
  }, [user.companies])

  const renderAbout = () => !!user.about?.length && (
    <ZixWidgetContainer label='About Driver'>
      <Text flex={1} color='black'>
        {user.about}
      </Text>
    </ZixWidgetContainer>
  )

  const renderCompanies = () => !!companiesLogos?.length && (
    <ZixWidgetContainer label='Works With'>
      <ZixMediasListWidget medias={companiesLogos || []} />
    </ZixWidgetContainer>
  )

  const renderLocation = () => !!user.location && (
    <ZixWidgetContainer label='Location'>
      <ZixLocationInfoWidget location={user.location} />
    </ZixWidgetContainer>
  )

  const renderWorkingHours = () => (
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
