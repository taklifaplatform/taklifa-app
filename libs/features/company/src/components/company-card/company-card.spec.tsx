import React from 'react';
import { render } from '@testing-library/react-native';

import { CompanyCard } from './company-card';

describe('UserCard', () => {
  it('should render successfully', () => {
    const { root } = render(<CompanyCard />);
    expect(root).toBeTruthy();
  });
});
