import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyServicesTab from './company-services-tab';

describe('CompanyServicesTab', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyServicesTab />);
    expect(root).toBeTruthy();
  });
});
