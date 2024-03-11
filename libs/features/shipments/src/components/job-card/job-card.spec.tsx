import React from 'react';
import { render } from '@testing-library/react-native';

import JobCard from './job-card';

describe('JobCard', () => {
  it('should render successfully', () => {
    const { root } = render(<JobCard />);
    expect(root).toBeTruthy();
  });
});
