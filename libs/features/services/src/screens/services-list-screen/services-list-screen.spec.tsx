import React from 'react';
import { render } from '@testing-library/react-native';

import ServicesListScreen from './services-list-screen';

describe('ServicesListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ServicesListScreen />);
    expect(root).toBeTruthy();
  });
});
