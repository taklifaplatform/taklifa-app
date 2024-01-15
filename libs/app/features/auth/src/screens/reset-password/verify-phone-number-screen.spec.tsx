import React from 'react';
import { render } from '@testing-library/react-native';

import VerifyPhoneNumberScreen from './verify-phone-number-screen';

describe('VerifyPhoneNumberScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< VerifyPhoneNumberScreen />);
    expect(root).toBeTruthy();
  });
});
