import React from 'react';
import { render } from '@testing-library/react-native';

import  MapFiltersTaklifa from './map-filters-taklifa';

describe('MapFiltersTaklifa', () => {
  it('should render successfully', () => {
    const { root } = render(< MapFiltersTaklifa />);
    expect(root).toBeTruthy();
  });
});
