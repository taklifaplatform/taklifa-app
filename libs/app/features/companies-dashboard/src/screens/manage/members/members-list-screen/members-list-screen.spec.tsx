import React from 'react';
import { render } from '@testing-library/react-native';

import ManagersListScreen from './members-list-screen';

describe('ManagersListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ManagersListScreen />);
    expect(root).toBeTruthy();
  });
});
