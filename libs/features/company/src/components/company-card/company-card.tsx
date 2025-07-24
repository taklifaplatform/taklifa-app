import { BadgeCheck, MapPin, Star } from '@tamagui/lucide-icons';
import { CompanyTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { TitleInfo, UserAvatar } from '@zix/ui/common';
import { useRouter } from 'solito/router';
import {
  Text,
  ThemeableStackProps,
  XStack,
  YStack,
  Theme
} from 'tamagui';
import {
  CompanyContactActions,
  CompanyContactActionsProps,
} from '../company-profile/company-contact-actions/company-contact-actions';

export type CompanyCardProps = ThemeableStackProps & {
  company: CompanyTransformer;
  companyContactActionsProps?: Partial<CompanyContactActionsProps>;
  showContactActions?: boolean;
  useShowButton?: boolean;
  setShowSheet?: (show: boolean) => void;
};

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  padding = '$4',
  companyContactActionsProps = {},
  showContactActions = true,
  useShowButton = false,
  setShowSheet,
  ...props
}) => {
  const router = useRouter();
  const { getUrlPrefix } = useAuth();

  function onPress() {
    if (setShowSheet) {
      setShowSheet(false);
    }
    router.push(`${getUrlPrefix}/companies/${company.id}`);
  }

  const renderLocationInfo = () =>
    !!company?.location?.id && (
      <TitleInfo icon={<Theme name="accent"><MapPin size={20} color="$color0" /></Theme>} title={company?.location?.address + ' ' + company?.location?.country?.name} />
    );

  const renderRatingsInfo = () =>
    !!company.rating_stats?.count && (
      <TitleInfo icon={<Theme name="accent"><Star size={20} color="$color0" /></Theme>} title={`(${company.rating_stats?.count}) ${company.rating_stats?.score}`} />
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
            <XStack theme='accent' alignItems="center" gap="$3">
              <Text fontSize='$6' fontWeight="bold" color="$color1">
              {company?.name}
            </Text>
            {/* TODO: add badge check if company is verified */}
            <BadgeCheck theme="accent" size={16} color="$color1" />
            </XStack>
            

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
