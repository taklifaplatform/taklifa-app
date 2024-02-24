import React from 'react';
import { render } from '@testing-library/react-native';

import VerifyPhoneNumberForm from './verify-phone-number-form';

describe('VerifyPhoneNumberForm', () => {
  it('should render successfully', () => {
    const { root } = render(<VerifyPhoneNumberForm />);
    expect(root).toBeTruthy();
  });
});
