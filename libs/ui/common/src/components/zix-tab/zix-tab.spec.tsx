import React from 'react';
import { render } from '@testing-library/react-native';

import ZixTab from './zix-tab';

describe('ZixTab', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixTab />);
    expect(root).toBeTruthy();
  });
});
