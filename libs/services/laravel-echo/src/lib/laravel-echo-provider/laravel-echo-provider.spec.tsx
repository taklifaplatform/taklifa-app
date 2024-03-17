import React from 'react';
import { render } from '@testing-library/react-native';

import LaravelEchoProvider from './laravel-echo-provider';

describe('LaravelEchoProvider', () => {
  it('should render successfully', () => {
    const { root } = render(< LaravelEchoProvider />);
    expect(root).toBeTruthy();
  });
});
