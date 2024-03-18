import React from 'react';
import { render } from '@testing-library/react-native';

import AccountSwitcher from './account-switcher';

describe('AccountSwitcher', () => {
  it('should render successfully', () => {
    const { root } = render(<AccountSwitcher />);
    expect(root).toBeTruthy();
  });
});
