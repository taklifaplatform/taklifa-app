import React from 'react';
import { render } from '@testing-library/react-native';

import BranchesListScreen from './branches-list-screen';

describe('BranchesListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< BranchesListScreen />);
    expect(root).toBeTruthy();
  });
});
