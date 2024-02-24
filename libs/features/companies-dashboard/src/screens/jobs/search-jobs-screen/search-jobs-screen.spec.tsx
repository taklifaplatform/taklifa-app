import React from 'react';
import { render } from '@testing-library/react-native';

import SearchJobsScreen from './search-jobs-screen';

describe('SearchJobsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<SearchJobsScreen />);
    expect(root).toBeTruthy();
  });
});
