import React from 'react';
import { render } from '@testing-library/react-native';

import VehicleCard from './vehicle-card';

describe('VehicleCard', () => {
  it('should render successfully', () => {
    const { root } = render(< VehicleCard />);
    expect(root).toBeTruthy();
  });
});
