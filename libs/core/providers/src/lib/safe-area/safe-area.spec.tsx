import React from 'react';
import { render } from '@testing-library/react-native';

import SafeArea from './safe-area';

describe('SafeArea', () => {
  it('should render successfully', () => {
    const { root } = render(< SafeArea />);
    expect(root).toBeTruthy();
  });
});
