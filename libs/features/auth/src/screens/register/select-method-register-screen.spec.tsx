import React from 'react';
import { render } from '@testing-library/react-native';

import SelectMethodRegisterScreen from './select-method-register-screen';

describe('SelectMethodRegisterScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<SelectMethodRegisterScreen />);
    expect(root).toBeTruthy();
  });
});
