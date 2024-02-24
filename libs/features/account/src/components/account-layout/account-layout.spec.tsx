import React from 'react';
import { render } from '@testing-library/react-native';

import AccountLayout from './account-layout';

describe('AccountLayout', () => {
  it('should render successfully', () => {
    const { root } = render(<AccountLayout />);
    expect(root).toBeTruthy();
  });
});
