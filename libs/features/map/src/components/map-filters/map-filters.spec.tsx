import React from 'react';
import { render } from '@testing-library/react-native';

import MapFilters from './map-filters';

describe('MapFilters', () => {
  it('should render successfully', () => {
    const { root } = render(< MapFilters />);
    expect(root).toBeTruthy();
  });
});
