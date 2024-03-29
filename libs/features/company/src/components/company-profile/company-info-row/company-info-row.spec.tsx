import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyInfoRow from './company-info-row';

describe('CompanyInfoRow', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyInfoRow />);
    expect(root).toBeTruthy();
  });
});
