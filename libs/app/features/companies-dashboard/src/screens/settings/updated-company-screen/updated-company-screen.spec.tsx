import React from 'react';
import { render } from '@testing-library/react-native';

import UpdateCompanyScreen from './updated-company-screen';

describe('UpdateCompanyScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< UpdateCompanyScreen />);
    expect(root).toBeTruthy();
  });
});
