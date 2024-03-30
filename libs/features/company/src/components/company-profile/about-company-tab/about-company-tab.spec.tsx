import React from 'react';
import { render } from '@testing-library/react-native';

import AboutCompanyTab from './about-company-tab';

describe('AboutCompanyTab', () => {
  it('should render successfully', () => {
    const { root } = render(< AboutCompanyTab />);
    expect(root).toBeTruthy();
  });
});
