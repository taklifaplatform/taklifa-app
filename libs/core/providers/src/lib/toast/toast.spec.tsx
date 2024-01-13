import React from 'react';
import { render } from '@testing-library/react-native';

import Toast from './toast';

describe('Toast', () => {
  it('should render successfully', () => {
    const { root } = render(< Toast />);
    expect(root).toBeTruthy();
  });
});
