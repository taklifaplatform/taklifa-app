import React from 'react';
import { render } from '@testing-library/react-native';

import LocationManagerScreen from './location-manager-screen';

describe('LocationManagerScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< LocationManagerScreen />);
    expect(root).toBeTruthy();
  });
});
