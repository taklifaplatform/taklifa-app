import React from 'react';
import { render } from '@testing-library/react-native';

import UserAvatar from './user-avatar';

describe('UserAvatar', () => {
  it('should render successfully', () => {
    const { root } = render(< UserAvatar />);
    expect(root).toBeTruthy();
  });
});
