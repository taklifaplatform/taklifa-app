import React from 'react';
import { render } from '@testing-library/react-native';

import ServiceDetailsScreen from './service-details-screen';

describe('ServiceDetailsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ServiceDetailsScreen />);
    expect(root).toBeTruthy();
  });
});
