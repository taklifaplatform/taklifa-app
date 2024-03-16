import React from 'react';
import { render } from '@testing-library/react-native';

import MainLayout from './main-layout';

describe('MainLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< MainLayout />);
    expect(root).toBeTruthy();
  });
});
