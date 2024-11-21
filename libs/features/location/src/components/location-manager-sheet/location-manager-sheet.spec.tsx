import React from 'react';
import { render } from '@testing-library/react-native';

import LocationManagerSheet from './location-manager-sheet';

describe('LocationManagerSheet', () => {
  it('should render successfully', () => {
    const { root } = render(< LocationManagerSheet />);
    expect(root).toBeTruthy();
  });
});
