import React from 'react';
import { render } from '@testing-library/react-native';

import LocationManager from './location-manager';

describe('LocationManager', () => {
  it('should render successfully', () => {
    const { root } = render(< LocationManager />);
    expect(root).toBeTruthy();
  });
});
