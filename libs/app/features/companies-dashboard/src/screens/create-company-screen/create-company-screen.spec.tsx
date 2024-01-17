import React from 'react';
import { render } from '@testing-library/react-native';

import CreateCompanyScreen from './create-company-screen';

describe('CreateCompanyScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CreateCompanyScreen />);
    expect(root).toBeTruthy();
  });
});
