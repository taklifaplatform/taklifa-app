import React from 'react';
import { render } from '@testing-library/react-native';

import ManageTeamScreen from './manage-team-screen';

describe('ManageTeamScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ManageTeamScreen />);
    expect(root).toBeTruthy();
  });
});
