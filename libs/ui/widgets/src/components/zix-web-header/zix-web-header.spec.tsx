import React from 'react';
import { render } from '@testing-library/react-native';

import ZixWebHeader from './zix-web-header';

describe('ZixWebHeader', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixWebHeader />);
    expect(root).toBeTruthy();
  });
});
