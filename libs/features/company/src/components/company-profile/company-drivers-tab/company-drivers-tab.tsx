import { User } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompanyMembersService, CompanyTransformer } from '@zix/api';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixVariantOptionsWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'solito/router';

import { XStack, YStack } from 'tamagui';

export type CompanyDriversTabProps = {
  company: CompanyTransformer
}

export const CompanyDriversTab: React.FC<CompanyDriversTabProps> = ({
  company
}) => {
  const router = useRouter()
  const { getUrlPrefix } = useAuth()

  const { data } = useQuery({
    queryFn: () => CompanyMembersService.list({
      company: company.id as string,
      role: USER_ROLES.company_driver,
    }),
    queryKey: ['CompanyMembersService.list', company.id],
  })

  return (
    <YStack gap='$2'>
      <ZixWidgetContainer label='Drivers'>
        <FlatList
          data={data?.data || []}
          renderItem={({ item, index }) => (
            <XStack
              onPress={() => {
                router.push(`${getUrlPrefix}/companies/${company.id}/employees/${item.id}`)
              }}
              key={`${item.id}-${index}`}
              gap='$4'
              padding='$3'
              marginBottom='$4'
              borderRadius='$4'
              backgroundColor='$color2'
              alignItems='center'
            >
              <UserAvatar user={item.user} />
              <ZixVariantOptionsWidget
                optionVariant="location"
                variant="location"
                options={[
                  {
                    icons: <User size="$1" color='$color11' />,
                    value: item.user?.name ?? 'N/A',
                  },
                  {
                    icons: <CustomIcon name='half_star' size="$1" color='$color11' />,
                    value: `${item.user?.rating_stats?.score} (${item.user?.rating_stats?.count})`,
                  },
                ]}
              />
            </XStack>
          )}
        />
      </ZixWidgetContainer>
    </YStack>
  );
}

export default CompanyDriversTab;
