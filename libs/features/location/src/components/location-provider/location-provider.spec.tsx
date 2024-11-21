import React from 'react';
import { render } from '@testing-library/react-native';

import LocationProvider from './location-provider';

describe('LocationProvider', () => {
  it('should render successfully', () => {
    const { root } = render(< LocationProvider />);
    expect(root).toBeTruthy();
  });
});
