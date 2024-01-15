import React from 'react';
import { render } from '@testing-library/react-native';

import SelectAccountTypeScreen from './select-account-type-screen';

describe('SelectAccountTypeScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< SelectAccountTypeScreen />);
    expect(root).toBeTruthy();
  });
});
