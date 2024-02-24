import React from 'react';
import { render } from '@testing-library/react-native';

import ZixInput from './zix-input';

describe('ZixInput', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixInput />);
    expect(root).toBeTruthy();
  });
});
