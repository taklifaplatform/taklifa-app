import React from 'react';
import { render } from '@testing-library/react-native';

import FullScreenSpinner from './full-screen-spinner';

describe('FullScreenSpinner', () => {
  it('should render successfully', () => {
    const { root } = render(<FullScreenSpinner />);
    expect(root).toBeTruthy();
  });
});
