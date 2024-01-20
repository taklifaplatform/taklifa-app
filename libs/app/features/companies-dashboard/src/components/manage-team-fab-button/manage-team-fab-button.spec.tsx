import React from 'react';
import { render } from '@testing-library/react-native';

import ManageTeamFabButton from './manage-team-fab-button';

describe('ManageTeamFabButton', () => {
  it('should render successfully', () => {
    const { root } = render(< ManageTeamFabButton />);
    expect(root).toBeTruthy();
  });
});
