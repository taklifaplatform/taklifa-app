import React from 'react';
import { render } from '@testing-library/react-native';

import BlankLayout from './blank-layout';

describe('BlankLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< BlankLayout />);
    expect(root).toBeTruthy();
  });
});
