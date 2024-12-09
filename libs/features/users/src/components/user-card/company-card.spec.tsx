import React from 'react';
import { render } from '@testing-library/react-native';
import CompanyCard from './user-card';


describe('CompanyCard', () => {
  it('should render successfully', () => {
    const { root } = render(<CompanyCard />);
    expect(root).toBeTruthy();
  });
});
