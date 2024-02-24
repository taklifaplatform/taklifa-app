import React from 'react';
import { render } from '@testing-library/react-native';

import AppHeader from './app-header';

describe('AppHeader', () => {
  it('should render successfully', () => {
    const { root } = render(<AppHeader />);
    expect(root).toBeTruthy();
  });
});
