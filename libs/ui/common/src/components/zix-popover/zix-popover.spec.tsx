import React from 'react';
import { render } from '@testing-library/react-native';

import ZixPopover from './zix-popover';

describe('ZixPopover', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixPopover />);
    expect(root).toBeTruthy();
  });
});
