import React from 'react';
import { render } from '@testing-library/react-native';

import ZixWebFooter from './zix-web-footer';

describe('ZixWebFooter', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixWebFooter />);
    expect(root).toBeTruthy();
  });
});
