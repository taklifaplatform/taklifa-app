import React from 'react';
import { render } from '@testing-library/react-native';

import PhoneNumberVerificationScreen from './phone-number-verification-screen';

describe('PhoneNumberVerificationScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< PhoneNumberVerificationScreen />);
    expect(root).toBeTruthy();
  });
});
