import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyBranchesTab from './company-branches-tab';

describe('CompanyBranchesTab', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyBranchesTab />);
    expect(root).toBeTruthy();
  });
});
