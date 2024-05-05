import React from 'react';
import { render } from '@testing-library/react-native';

import ZixGetDirection from './zix-get-direction';

describe('ZixGetDirection', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixGetDirection />);
    expect(root).toBeTruthy();
  });
});
