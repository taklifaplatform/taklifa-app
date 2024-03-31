import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyVehicleCard from './company-vehicle-card';

describe('CompanyVehicleCard', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyVehicleCard />);
    expect(root).toBeTruthy();
  });
});
