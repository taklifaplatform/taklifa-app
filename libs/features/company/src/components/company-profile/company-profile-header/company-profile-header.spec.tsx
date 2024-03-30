import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyProfileHeader from './company-profile-header';

describe('CompanyProfileHeader', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyProfileHeader />);
    expect(root).toBeTruthy();
  });
});
