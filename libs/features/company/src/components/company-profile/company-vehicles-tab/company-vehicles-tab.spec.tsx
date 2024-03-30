import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyVehiclesTab from './company-vehicles-tab';

describe('CompanyVehiclesTab', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyVehiclesTab />);
    expect(root).toBeTruthy();
  });
});
