import { CompanyTransformer } from '@zix/api';
import { ZixAvatar } from '@zix/ui/common';
import React from 'react';
import { H4, Text, XStack, YStack } from 'tamagui';

export type CompanyProfileHeaderProps = {
  company: CompanyTransformer;
};

export const CompanyProfileHeader: React.FC<CompanyProfileHeaderProps> = ({ company }) => {
  return (
    <YStack gap="$2">
      <XStack gap="$2" justifyContent="center" $sm={{ marginTop: '$4' }}>
        <ZixAvatar
          media={company?.logo}
          name={company?.name}
          size="$9"
        />
      </XStack>
      <YStack gap="$2">
        <H4 textAlign="center">{company.name ?? 'N/A'}</H4>
        <Text textAlign="center" fontWeight="bold" color="$color8">
          Online now
        </Text>
      </YStack>
    </YStack>
  );
};


export default CompanyProfileHeader;
