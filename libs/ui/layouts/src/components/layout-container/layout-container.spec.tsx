import React from 'react';
import { render } from '@testing-library/react-native';

import LayoutContainer from './layout-container';

describe('LayoutContainer', () => {
  it('should render successfully', () => {
    const { root } = render(< LayoutContainer />);
    expect(root).toBeTruthy();
  });
});
