import React from 'react';
import { render } from '@testing-library/react-native';

import HeaderShipment from './header-shipment';

describe('HeaderShipment', () => {
  it('should render successfully', () => {
    const { root } = render(< HeaderShipment />);
    expect(root).toBeTruthy();
  });
});
