import React from 'react';
import { render } from '@testing-library/react-native';

import JobDetailsScreen from './job-details-screen';

describe('JobDetailsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<JobDetailsScreen />);
    expect(root).toBeTruthy();
  });
});
