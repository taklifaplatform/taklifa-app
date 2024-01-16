import React from 'react';
import { render } from '@testing-library/react-native';

import ChangePasswordForm from './change-password-form';

describe('ChangePasswordForm', () => {
  it('should render successfully', () => {
    const { root } = render(< ChangePasswordForm />);
    expect(root).toBeTruthy();
  });
});
