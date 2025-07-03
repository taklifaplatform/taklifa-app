import { CompanyTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { Text, Theme, ThemeableStackProps, XStack, YStack } from 'tamagui';

export type CompanyInfoRowProps = ThemeableStackProps & {
  company: CompanyTransformer;
};

export const CompanyInfoRow: React.FC<CompanyInfoRowProps> = ({
  company,
  ...props
}) => {

  const renderLocationInfo = () => !!company?.location?.id && (
      <XStack alignItems="center" gap="$2">
        <Theme name='accent'>
          <CustomIcon name="location" size='$1' color="$color1" />
        </Theme>
        <Text color='$color12' fontWeight="600" fontSize="$1">
          {company?.location?.country?.name}
        </Text>
      </XStack>

  )

  const renderRatingsInfo = () => !!company.rating_stats?.count && (
    <XStack alignItems="center" gap="$2">
      <Theme name='accent'>
        <CustomIcon name="star" size='$1' color="$color1" />
      </Theme>
      <Text color='$color12' fontWeight="600" fontSize="$1">
        ({company.rating_stats?.count}) {company.rating_stats?.score}
      </Text>
    </XStack>
  )

  return (
    <YStack justifyContent="space-between" {...props}>
      {renderLocationInfo()}
      {renderRatingsInfo()}
    </YStack>
  );
};



export default CompanyInfoRow;
