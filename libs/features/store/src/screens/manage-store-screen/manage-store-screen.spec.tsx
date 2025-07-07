import React from 'react';
import { render } from '@testing-library/react-native';

import ManageStoreScreen from './manage-store-screen';

describe('ManageStoreScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageStoreScreen />);
    expect(root).toBeTruthy();
  });
});
