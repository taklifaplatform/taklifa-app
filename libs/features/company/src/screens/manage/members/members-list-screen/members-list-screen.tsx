import { useQuery } from '@tanstack/react-query';

import { CompanyInvitationsService, CompanyMembersService } from '@zix/api';
import { COMPANY_ROLE_TYPES } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { useMemo } from 'react';
import { SectionList } from 'react-native';
import { H4, Stack, useStyle } from 'tamagui';
import { TeamMemberInvitationCard } from '../../../../components/team-member-invitation-card/team-member-invitation-card';
import { TeamMemberCard } from '../../../../components/team-member-card/team-member-card';

export interface MembersListScreenProps {
  memberRole: COMPANY_ROLE_TYPES;
  company_id: string;
}

export function MembersListScreen({
  memberRole,
  company_id,
}: MembersListScreenProps) {
  const membersQuery = useQuery({
    queryFn: () =>
      CompanyMembersService.list({
        company: company_id,
        role: memberRole,
      }),
    queryKey: ['CompanyMembersService.list', company_id, memberRole],
  });

  const invitationsQuery = useQuery({
    queryFn: () =>
      CompanyInvitationsService.list({
        company: company_id,
        role: memberRole,
      }),
    queryKey: ['CompanyInvitationsService.list', company_id, memberRole],
  });

  const sectionListStyle = useStyle({
    flex: 1,
    paddingHorizontal: '$2',
  });

  const sections = useMemo(() => {
    const _sections = []

    if (membersQuery?.data?.data) {
      _sections.push({
        key: 'Members',
        data: membersQuery?.data?.data || [],
        renderItem: ({ item, index }) => <TeamMemberCard key={`${item.id}-${index}`} member={item} />,
      })
    }

    if (invitationsQuery?.data?.data) {
      _sections.push({
        key: 'invitation',
        data: invitationsQuery?.data?.data || [],
        renderItem: ({ item, index }) => (
          <TeamMemberInvitationCard key={`${item.id}-${index}`} invitation={item} />
        ),
      })
    }

    return _sections
  }, [membersQuery?.data?.data, invitationsQuery?.data?.data])

  return (
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
  );
}

export default MembersListScreen;
