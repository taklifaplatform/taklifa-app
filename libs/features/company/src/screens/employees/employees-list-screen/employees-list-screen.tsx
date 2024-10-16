import { useQuery } from '@tanstack/react-query';

import { CompanyInvitationsService, CompanyMembersService } from '@zix/api';
import { COMPANY_ROLE_TYPES, useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { useMemo } from 'react';
import { SectionList } from 'react-native';
import { H4, Stack, useStyle } from 'tamagui';
import { TeamMemberCard } from '../../../components/team-member-card/team-member-card';
import { TeamMemberInvitationCard } from '../../../components/team-member-invitation-card/team-member-invitation-card';
import { ScreenLayout } from '@zix/ui/layouts';

export interface EmployeesListScreenProps {
  memberRole: COMPANY_ROLE_TYPES;
  search?: string;
}

export function EmployeesListScreen({
  memberRole,
  search,
}: EmployeesListScreenProps) {
  const { user } = useAuth();

  const membersQuery = useQuery({
    queryFn: () =>
      CompanyMembersService.list({
        company: user?.active_company?.id || '',
        role: memberRole,
        search,
      }),
    queryKey: [
      'CompanyMembersService.list',
      user?.active_company?.id,
      memberRole,
      `-${search}`,
    ],
  });

  const invitationsQuery = useQuery({
    queryFn: () =>
      CompanyInvitationsService.list({
        company: user?.active_company?.id || '',
        role: memberRole,
        search,
      }),
    queryKey: [
      'CompanyInvitationsService.list',
      user?.active_company?.id,
      memberRole,
      `-${search}`,
    ],
  });

  const sectionListStyle = useStyle({
    flex: 1,
    paddingHorizontal: '$2',
  });

  const sections = useMemo(() => {
    const _sections = [];

    if (membersQuery?.data?.data) {
      _sections.push({
        key: 'Members',
        data: membersQuery?.data?.data || [],
        renderItem: ({ item, index }) => (
          <TeamMemberCard key={`${item.id}-${index}`} member={item} />
        ),
      });
    }

    if (invitationsQuery?.data?.data) {
      _sections.push({
        key: 'invitation',
        data: invitationsQuery?.data?.data || [],
        renderItem: ({ item, index }) => (
          <TeamMemberInvitationCard
            key={`${item.id}-${index}`}
            invitation={item}
            company={user.active_company}
          />
        ),
      });
    }

    return _sections;
  }, [membersQuery?.data?.data, invitationsQuery?.data?.data]);

  return (
    <ScreenLayout>
      <SectionList
        style={sectionListStyle as any}
        refreshing={membersQuery?.isLoading}
        onRefresh={() => {
          membersQuery?.refetch();
          invitationsQuery?.refetch();
        }}
        sections={sections}
        ListEmptyComponent={() => (
          <Stack flex={1} alignItems="center" marginBottom="$6">
            <CustomIcon name="empty_data" size="$20" color={'#757575'} />
            <H4>No members yet</H4>
          </Stack>
        )}
      />
    </ScreenLayout>
  );
}

export default EmployeesListScreen;
