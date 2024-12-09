import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import React, { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Image, Separator, Text, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { UserContactActionsProps } from '../user-contact-actions/user-contact-actions';
import { UserInfoRow } from '../user-info-row/user-info-row';
import CompanyContactActions from 'libs/features/company/src/components/company-profile/company-contact-actions/company-contact-actions';
import { useAuth } from '@zix/services/auth';

export type CompanyCardProps = ThemeableStackProps & {
  user: DriverTransformer;
  userContactActionsProps?: Partial<UserContactActionsProps>
  showContactActions?: boolean;
};

export const CompanyCard: React.FC<CompanyCardProps> = React.memo(({
  user,
  padding = '$4',
  userContactActionsProps = {},
  showContactActions = true,
  ...props
}) => {
  const router = useRouter();

  const { user: authUser } = useAuth();

  const activeCompany = useMemo(() => {
    return user?.companies?.filter((company) => company?.logo?.url).shift();
  }, [user?.companies]);

  function onPress() {
    router.push(`/app/companies/${user.id}`);
  }

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
          <UserAvatar user={user} size="$5" />
          <YStack alignItems="flex-start">
            <Text color='$color12' fontWeight="bold">
              {user?.name}
            </Text>
            {activeCompany && (
              <Text color='$color11'>
                {activeCompany?.name}
              </Text>
            )}
          </YStack>
        </XStack>
        <XStack alignItems='center' gap='$2'>
          {activeCompany && (
            <Image
              source={{
                uri: activeCompany?.logo?.original_url,
              }}
              width='$9'
              height='$4'
              resizeMode="cover"
            />
          )}
        </XStack>

      </XStack>

      <UserInfoRow user={user} paddingHorizontal={padding} />
      <ZixMediasListWidget medias={user?.vehicle?.images || []} paddingHorizontal={padding} />
      {showContactActions && <Separator borderColor="$gray6" />}
      {showContactActions && !authUser?.companies?.find(c => c.id === user?.id) && <CompanyContactActions company={user} {...userContactActionsProps} user={user} paddingHorizontal={padding} />}
    </YStack>
  );

},
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
);

export default CompanyCard;
