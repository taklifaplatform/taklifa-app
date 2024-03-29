import React from 'react';
import { render } from '@testing-library/react-native';

import ZixAvatar from './zix-avatar';

describe('ZixAvatar', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixAvatar />);
    expect(root).toBeTruthy();
  });
});
