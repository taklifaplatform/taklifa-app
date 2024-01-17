import React from 'react';
import { render } from '@testing-library/react-native';

import CreateDriverScreen from './create-driver-screen';

describe('CreateDriverScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CreateDriverScreen />);
    expect(root).toBeTruthy();
  });
});
