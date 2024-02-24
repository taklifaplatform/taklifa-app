import React from 'react';
import { render } from '@testing-library/react-native';

import CustomIcon from './custom-icon';

describe('CustomIcon', () => {
  it('should render successfully', () => {
    const { root } = render(<CustomIcon />);
    expect(root).toBeTruthy();
  });
});
