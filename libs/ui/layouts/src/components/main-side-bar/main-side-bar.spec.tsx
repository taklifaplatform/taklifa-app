import React from 'react';
import { render } from '@testing-library/react-native';

import MainSideBar from './main-side-bar';

describe('MainSideBar', () => {
  it('should render successfully', () => {
    const { root } = render(< MainSideBar />);
    expect(root).toBeTruthy();
  });
});
