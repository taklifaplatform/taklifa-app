import React from 'react';
import { render } from '@testing-library/react-native';

import ManageCompanyDataScreen from './manage-company-data-screen';

describe('ManageCompanyDataScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageCompanyDataScreen />);
    expect(root).toBeTruthy();
  });
});
