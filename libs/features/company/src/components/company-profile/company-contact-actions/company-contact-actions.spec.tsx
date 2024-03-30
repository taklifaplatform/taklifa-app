import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyContactActions from './company-contact-actions';

describe('CompanyContactActions', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyContactActions />);
    expect(root).toBeTruthy();
  });
});
