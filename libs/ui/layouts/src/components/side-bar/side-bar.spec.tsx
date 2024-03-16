import React from 'react';
import { render } from '@testing-library/react-native';

import SideBar from './side-bar';

describe('SideBar', () => {
  it('should render successfully', () => {
    const { root } = render(< SideBar />);
    expect(root).toBeTruthy();
  });
});
