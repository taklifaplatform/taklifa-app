import { CompanyTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'solito/router';
import {
  Image,
  Separator,
  Text,
  Theme,
  ThemeableStackProps,
  XStack,
  YStack,
} from 'tamagui';
import {
  CompanyContactActions,
  CompanyContactActionsProps,
} from '../company-profile/company-contact-actions/company-contact-actions';
import { useAuth } from '@zix/services/auth';
import { MapPin, Star } from '@tamagui/lucide-icons';
import { t } from 'i18next';
import { TitleInfo, UserAvatar } from '@zix/ui/common';

export type CompanyCardProps = ThemeableStackProps & {
  company: CompanyTransformer;
  companyContactActionsProps?: Partial<CompanyContactActionsProps>;
  showContactActions?: boolean;
  useShowButton?: boolean;
};

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  padding = '$4',
  companyContactActionsProps = {},
  showContactActions = true,
  useShowButton = false,
  ...props
}) => {
  const router = useRouter();
  const { getUrlPrefix } = useAuth();

  function onPress() {
    router.push(`${getUrlPrefix}/companies/${company.id}`);
  }

  const renderLocationInfo = () =>
    !!company?.location?.id && (
      <TitleInfo icon={<MapPin size={20} color="$color0" />} title={company?.location?.address + ' ' + company?.location?.country?.name} />
    );

  const renderRatingsInfo = () =>
    !!company.rating_stats?.count && (
      <TitleInfo icon={<Star size={20} color="$color1" />} title={`(${company.rating_stats?.count}) ${company.rating_stats?.score}`} />
    );

  return (
    <YStack
      onPress={onPress}
      backgroundColor="$color1"
      borderRadius="$5"
      paddingVertical={padding}
      gap="$6"
      // justifyContent='space-between'
      {...props}
    >
      <XStack
        justifyContent="center"
        paddingHorizontal={padding}
        alignItems="center"
        gap="$4"
      >
        <UserAvatar user={company} size="$5" />

        <XStack alignItems="center" gap="$2" flex={1}>
          <YStack alignItems="flex-start" gap="$2">
            <Text color="$color12" fontWeight="bold">
              {company?.name}
            </Text>

            {renderLocationInfo()}
            {renderRatingsInfo()}
          </YStack>
        </XStack>
      </XStack>
      {showContactActions && (
        <CompanyContactActions
          {...companyContactActionsProps}
          company={company}
          paddingHorizontal={padding}
          useShowButton={useShowButton}
        />
      )}
    </YStack>
  );
};

export default CompanyCard;
