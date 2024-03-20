import React from 'react';
import { render } from '@testing-library/react-native';

import ZixContainer from './zix-container';

describe('ZixContainer', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixContainer />);
    expect(root).toBeTruthy();
  });
});
