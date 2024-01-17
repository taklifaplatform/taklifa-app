import React from 'react';
import { render } from '@testing-library/react-native';

import EditAccountScreen from './edit-account-screen';

describe('EditAccountScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< EditAccountScreen />);
    expect(root).toBeTruthy();
  });
});
