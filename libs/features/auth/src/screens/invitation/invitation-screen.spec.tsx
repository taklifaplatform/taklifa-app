import React from 'react';
import { render } from '@testing-library/react-native';

import { InvitationScreen } from './invitation-screen';

describe('InvitationScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<InvitationScreen />);
    expect(root).toBeTruthy();
  });
});
