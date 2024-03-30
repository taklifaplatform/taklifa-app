import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyDriversTab from './company-drivers-tab';

describe('CompanyDriversTab', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyDriversTab />);
    expect(root).toBeTruthy();
  });
});
