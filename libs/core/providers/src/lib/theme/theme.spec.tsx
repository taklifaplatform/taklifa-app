import React from 'react';
import { render } from '@testing-library/react-native';

import Theme from './theme';

describe('Theme', () => {
  it('should render successfully', () => {
    const { root } = render(< Theme />);
    expect(root).toBeTruthy();
  });
});
