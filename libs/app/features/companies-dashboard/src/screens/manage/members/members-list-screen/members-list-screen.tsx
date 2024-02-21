

import { api } from '@zix/api';
import { H4, Stack, Text, YStack, useStyle } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { SectionList } from 'react-native';
import TeamMemberCard from '../../../../components/team-member-card/team-member-card';
import TeamMemberInvitationCard from '../../../../components/team-member-invitation-card/team-member-invitation-card';

/* eslint-disable-next-line */
export interface MembersListScreenProps {
  memberRole: 'manager' | 'driver'
  company_id: string
}


export function MembersListScreen({ memberRole, company_id }: MembersListScreenProps) {
  const membersQuery = api.companyManageMembers.list.useQuery({
    company_id,
    role: memberRole
  })
  const invitationsQuery = api.companyInvitations.list.useQuery({
    company_id,
    role: memberRole
  })

  const sectionListStyle = useStyle({
    flex: 1,
    paddingHorizontal: '$4'
  })


  return (
    <SectionList
      style={sectionListStyle as any}
      refreshing={invitationsQuery?.isLoading || membersQuery?.isLoading}
      onRefresh={() => {
        membersQuery?.refetch()
        invitationsQuery?.refetch()
      }}
      onEndReached={() => {
        // membersQuery?.ge()
        // invitationsQuery?.fetchNextPage()

      }}
      sections={[
        {
          key: 'Members',
          data: membersQuery?.data?.data || [],
          renderItem: ({ item }) => <TeamMemberCard member={item} />,
        },
        {
          key: 'invitation',
          data: invitationsQuery?.data?.data || [],
          renderItem: ({ item }) => <TeamMemberInvitationCard invitation={item} />,
        },
      ]}
      renderSectionHeader={({ section: { key, data } }) => {
        return (
          <YStack
            backgroundColor='$background'
            width={'100%'}
            height={'$4'}
            justifyContent={'center'}
          >
            <Text fontSize="$6" fontWeight="800">
              {key === 'Members' ? 'Members' : 'Invitations'}
            </Text>
          </YStack>
        )
      }}
      renderSectionFooter={({ section: { key, data } }) => {
        if (data.length) {
          return null
        }
        return (
          <Stack flex={1} alignItems='center' marginBottom='$6'>
            <CustomIcon name="empty_data" size="$20" color={'#757575'} />
            <H4>
              No members yet
            </H4>
          </Stack>
        )
      }}

    />
  )
}


export default MembersListScreen;
