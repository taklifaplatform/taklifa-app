import React from 'react';
import { render } from '@testing-library/react-native';

import ScreenLayout from './screen-layout';

describe('ScreenLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< ScreenLayout />);
    expect(root).toBeTruthy();
  });
});
