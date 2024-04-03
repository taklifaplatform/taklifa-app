import { CompanyTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'solito/router';
import { Image, Separator, Text, Theme, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { CompanyContactActions, CompanyContactActionsProps } from '../company-profile/company-contact-actions/company-contact-actions';

export type CompanyCardProps = ThemeableStackProps & {
  company: CompanyTransformer;
  companyContactActionsProps?: Partial<CompanyContactActionsProps>
};

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  padding = '$4',
  companyContactActionsProps = {},
  ...props
}) => {
  const router = useRouter();


  function onPress() {
    router.push(`/app/companies/${company.id}`);
  }

  const renderLocationInfo = () => !!company?.location?.id && (
    <XStack alignItems="center" gap="$2">
      <Theme name='accent'>
        <CustomIcon name="location" size='$1' color="$color9" />
      </Theme>
      <Text color='$color12' fontWeight="600" fontSize="$1">
        {company?.location?.country?.name}
      </Text>
    </XStack>
  )

  const renderRatingsInfo = () => !!company.rating_stats?.count && (
    <XStack alignItems="center" gap="$2">
      <Theme name='accent'>
        <CustomIcon name="star" size='$1' color="$color9" />
      </Theme>
      <Text color='$color12' fontWeight="600" fontSize="$1">
        ({company.rating_stats?.count}) {company.rating_stats?.score}
      </Text>
    </XStack>
  )

  return (
    <YStack
      onPress={onPress}
      backgroundColor='$color1'
      borderRadius='$5'
      paddingVertical={padding}
      gap="$4"
      justifyContent='space-between'
      {...props}
    >
      <XStack justifyContent="space-between" paddingHorizontal={padding} alignItems="center">
        <XStack alignItems="center" gap="$2" flex={1}>
          <YStack alignItems="flex-start" gap='$2'>
            <Text color='$color12' fontWeight="bold">
              {company?.name}
            </Text>

            {renderLocationInfo()}
            {renderRatingsInfo()}
          </YStack>
        </XStack>
        <XStack alignItems='center' gap='$2'>
          {company.logo && (
            <Image
              source={{
                uri: company?.logo?.original_url,
              }}
              width='$9'
              height='$4'
              resizeMode="cover"
            />
          )}
        </XStack>

      </XStack>
      <Separator borderColor="$gray6" />
      <CompanyContactActions {...companyContactActionsProps} company={company} paddingHorizontal={padding} />
    </YStack>
  );
};

export default CompanyCard;
