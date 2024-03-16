import React from 'react';
import { render } from '@testing-library/react-native';

import ComplainScreen from './complain-screen';

describe('ComplainScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ComplainScreen />);
    expect(root).toBeTruthy();
  });
});
