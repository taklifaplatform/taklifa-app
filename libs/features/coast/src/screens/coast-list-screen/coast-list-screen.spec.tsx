import React from 'react';
import { render } from '@testing-library/react-native';

import CoastListScreen from './coast-list-screen';

describe('CoastListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CoastListScreen />);
    expect(root).toBeTruthy();
  });
});
