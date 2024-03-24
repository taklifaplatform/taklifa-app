import React from 'react';
import { render } from '@testing-library/react-native';

import UpdateMemberScreen from './update-member-screen';

describe('UpdateMemberScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<UpdateMemberScreen />);
    expect(root).toBeTruthy();
  });
});
