import React from 'react';
import { render } from '@testing-library/react-native';

import JobsListScreen from './jobs-list-screen';

describe('JobsListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< JobsListScreen />);
    expect(root).toBeTruthy();
  });
});
