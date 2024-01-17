import React from 'react';
import { render } from '@testing-library/react-native';

import ChangeEmailScreen from './change-email-screen';

describe('ChangeEmailScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChangeEmailScreen />);
    expect(root).toBeTruthy();
  });
});
