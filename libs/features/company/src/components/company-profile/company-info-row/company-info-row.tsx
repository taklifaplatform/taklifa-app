import { CompanyTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { t } from 'i18next';
import { Separator, Text, Theme, ThemeableStackProps, XStack } from 'tamagui';

export type CompanyInfoRowProps = ThemeableStackProps & {
  company: CompanyTransformer;
};

export const CompanyInfoRow: React.FC<CompanyInfoRowProps> = ({
  company,
  ...props
}) => {

  const renderVehicleInfo = () => !!company?.vehicles_count && (
    <>
      <XStack alignItems="center" gap="$2">
        <Theme name='accent'>
          <CustomIcon name="car" size='$1' color="$color1" />
        </Theme>
        <Text color='$color12' fontWeight="600" fontSize="$1">
          {company.vehicles_count} {t('common:vehicles')}
        </Text>
      </XStack>

      {
        !!company?.location?.id && (
          <Separator vertical borderColor="$color4" borderWidth={"$1"} />
        )
      }
    </>
  )

  const renderLocationInfo = () => !!company?.location?.id && (
    <>
      <XStack alignItems="center" gap="$2">
        <Theme name='accent'>
          <CustomIcon name="location" size='$1' color="$color1" />
        </Theme>
        <Text color='$color12' fontWeight="600" fontSize="$1">
          {company?.location?.country?.name}
        </Text>
      </XStack>
      {
        !!company.rating_stats?.count && (
          <Separator vertical borderColor="$color4" borderWidth={"$1"} />
        )
      }
    </>
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
    <XStack justifyContent="space-between" {...props}>
      {renderVehicleInfo()}
      {renderLocationInfo()}
      {renderRatingsInfo()}
    </XStack>
  );
};



export default CompanyInfoRow;
