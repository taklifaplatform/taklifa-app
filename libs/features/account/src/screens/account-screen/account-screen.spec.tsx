import React from 'react';
import { render } from '@testing-library/react-native';

import AccountScreen from './account-screen';

describe('AccountScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<AccountScreen />);
    expect(root).toBeTruthy();
  });
});
