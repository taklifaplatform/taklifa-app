import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMapDirectionWidget from './zix-map-direction-widget';

describe('ZixMapDirectionWidget', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMapDirectionWidget />);
    expect(root).toBeTruthy();
  });
});
