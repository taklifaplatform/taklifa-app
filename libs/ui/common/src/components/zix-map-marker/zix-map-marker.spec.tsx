import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMapMarker from './zix-map-marker';

describe('ZixMapMarker', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMapMarker />);
    expect(root).toBeTruthy();
  });
});
