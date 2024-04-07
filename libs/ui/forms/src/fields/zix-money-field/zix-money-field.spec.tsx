import React from 'react';
import { render } from '@testing-library/react-native';

import ZixPhoneField from './zix-money-field';

describe('ZixPhoneField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixPhoneField />);
    expect(root).toBeTruthy();
  });
});
