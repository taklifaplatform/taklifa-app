import React from 'react';
import { render } from '@testing-library/react-native';

import KycVerificationScreen from './kyc-verification-screen';

describe('KycVerificationScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<KycVerificationScreen />);
    expect(root).toBeTruthy();
  });
});
