import React from 'react';
import { render } from '@testing-library/react-native';

import Tamagui from './tamagui';

describe('Tamagui', () => {
  it('should render successfully', () => {
    const { root } = render(< Tamagui />);
    expect(root).toBeTruthy();
  });
});
