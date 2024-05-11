import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyListItem from './company-list-item';

describe('CompanyListItem', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyListItem />);
    expect(root).toBeTruthy();
  });
});
