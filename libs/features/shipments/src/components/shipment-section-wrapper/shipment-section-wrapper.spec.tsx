import React from 'react';
import { render } from '@testing-library/react-native';

import { ShipmentSectionWrapper } from './shipment-section-wrapper';

describe('ShipmentSectionWrapper', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentSectionWrapper > </ShipmentSectionWrapper>);
    expect(root).toBeTruthy();
  });
});
