import React from 'react';
import { render } from '@testing-library/react-native';

import LocationField from './location-field';

describe('LocationField', () => {
  it('should render successfully', () => {
    const { root } = render(< LocationField />);
    expect(root).toBeTruthy();
  });
});
