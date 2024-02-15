import React from 'react';
import { render } from '@testing-library/react-native';

import TeamMemberCard from './team-member-card';

describe('TeamMemberCard', () => {
  it('should render successfully', () => {
    const { root } = render(< TeamMemberCard />);
    expect(root).toBeTruthy();
  });
});
