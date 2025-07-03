import React from 'react';
import { render } from '@testing-library/react-native';

import ZixSlider from './zix-slider';

describe('ZixSlider', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixSlider />);
    expect(root).toBeTruthy();
  });
});
