import React from 'react';
import { render } from '@testing-library/react-native';

import Auth from './auth';

describe('Auth', () => {
  it('should render successfully', () => {
    const { root } = render(< Auth />);
    expect(root).toBeTruthy();
  });
});
