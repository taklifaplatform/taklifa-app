import { DriverTransformer, MediaTransformer } from '@zix/api';
import { ZixMediasList, ZixWidgetContainer } from '@zix/ui/widgets';
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

  const renderAbout = () => !!user.about && (
    <ZixWidgetContainer label='About Driver'>
      <Text>
        {user.about}
      </Text>
    </ZixWidgetContainer>
  )

  const renderCompanies = () => !!companiesLogos?.length && (
    <ZixWidgetContainer label='Works With'>
      <ZixMediasList medias={companiesLogos || []}/>
    </ZixWidgetContainer>
  )

  return (
    <YStack>
      {renderAbout()}
      {renderCompanies()}
    </YStack>
  );
}

export default AboutUserTab;
