import React from 'react';
import { render } from '@testing-library/react-native';

import ZixLocationInfoWidget from './zix-location-info-widget';

describe('ZixLocationInfoWidget', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixLocationInfoWidget />);
    expect(root).toBeTruthy();
  });
});
