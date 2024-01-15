import React from 'react';
import { render } from '@testing-library/react-native';

import NumberField from './number-field';

describe('NumberField', () => {
  it('should render successfully', () => {
    const { root } = render(< NumberField />);
    expect(root).toBeTruthy();
  });
});
