import React from 'react';
import { render } from '@testing-library/react-native';

import StoreProfileScreen from './store-profile-screen';

describe('StoreProfileScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< StoreProfileScreen />);
    expect(root).toBeTruthy();
  });
});
