import React from 'react';
import { render } from '@testing-library/react-native';

import ProductCard from './product-card';

describe('ProductCard', () => {
  it('should render successfully', () => {
    const { root } = render(< ProductCard />);
    expect(root).toBeTruthy();
  });
});
