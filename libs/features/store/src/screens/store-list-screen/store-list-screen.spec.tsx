import React from 'react';
import { render } from '@testing-library/react-native';

import VehiclesListScreen from './store-list-screen';

describe('VehiclesListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<VehiclesListScreen />);
    expect(root).toBeTruthy();
  });
});
