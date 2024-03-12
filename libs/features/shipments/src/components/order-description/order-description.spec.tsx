import React from 'react';
import { render } from '@testing-library/react-native';

import OrderDescription from './order-description';

describe('OrderDescription', () => {
  it('should render successfully', () => {
    const { root } = render(< OrderDescription />);
    expect(root).toBeTruthy();
  });
});
