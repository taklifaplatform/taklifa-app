import React from 'react';
import { render } from '@testing-library/react-native';

import VehicleImagesRow from './vehicle-images-row';

describe('VehicleImagesRow', () => {
  it('should render successfully', () => {
    const { root } = render(<VehicleImagesRow />);
    expect(root).toBeTruthy();
  });
});
