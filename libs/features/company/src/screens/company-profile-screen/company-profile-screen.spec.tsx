import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyProfileScreen from './company-profile-screen';

describe('CompanyProfileScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyProfileScreen />);
    expect(root).toBeTruthy();
  });
});
