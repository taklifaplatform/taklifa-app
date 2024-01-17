import React from 'react';
import { render } from '@testing-library/react-native';

import UpdateManagerScreen from './update-manager-screen';

describe('UpdateManagerScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< UpdateManagerScreen />);
    expect(root).toBeTruthy();
  });
});
