import React from 'react';
import { render } from '@testing-library/react-native';

import ZixDialog from './zix-dialog';

describe('ZixDialog', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixDialog />);
    expect(root).toBeTruthy();
  });
});
