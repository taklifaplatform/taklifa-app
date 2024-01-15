import React from 'react';
import { render } from '@testing-library/react-native';

import SelectUserTypeScreen from './select-user-type-screen';

describe('SelectUserTypeScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< SelectUserTypeScreen />);
    expect(root).toBeTruthy();
  });
});
