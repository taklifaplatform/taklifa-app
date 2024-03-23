import React from 'react';
import { render } from '@testing-library/react-native';

import AppBottomBar from './app-bottom-bar';

describe('AppBottomBar', () => {
  it('should render successfully', () => {
    const { root } = render(< AppBottomBar />);
    expect(root).toBeTruthy();
  });
});
