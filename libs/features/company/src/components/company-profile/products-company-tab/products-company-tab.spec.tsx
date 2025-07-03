import React from 'react';
import { render } from '@testing-library/react-native';

import ProductsCompanyTab from './products-company-tab';

describe('ProductsCompanyTab', () => {
  it('should render successfully', () => {
    const { root } = render(< ProductsCompanyTab />);
    expect(root).toBeTruthy();
  });
});
