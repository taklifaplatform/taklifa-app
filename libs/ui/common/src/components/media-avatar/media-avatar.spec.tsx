import React from 'react';
import { render } from '@testing-library/react-native';

import MediaAvatar from './media-avatar';

describe('MediaAvatar', () => {
  it('should render successfully', () => {
    const { root } = render(<MediaAvatar />);
    expect(root).toBeTruthy();
  });
});
