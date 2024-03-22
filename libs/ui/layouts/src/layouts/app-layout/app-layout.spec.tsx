import React from 'react';
import { render } from '@testing-library/react-native';

import AppLayout from './app-layout';

describe('AppLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< AppLayout />);
    expect(root).toBeTruthy();
  });
});
