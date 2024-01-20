import React from 'react';
import { render } from '@testing-library/react-native';

import MapView from './map-view';

describe('MapView', () => {
  it('should render successfully', () => {
    const { root } = render(< MapView />);
    expect(root).toBeTruthy();
  });
});
