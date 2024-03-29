import React from 'react';
import { render } from '@testing-library/react-native';

import MapCompanyMarker from './map-company-marker';

describe('MapCompanyMarker', () => {
  it('should render successfully', () => {
    const { root } = render(<MapCompanyMarker />);
    expect(root).toBeTruthy();
  });
});
