import React from 'react';
import { render } from '@testing-library/react-native';

import TeamMemberInvitationCard from './team-member-invitation-card';

describe('TeamMemberInvitationCard', () => {
  it('should render successfully', () => {
    const { root } = render(< TeamMemberInvitationCard />);
    expect(root).toBeTruthy();
  });
});
