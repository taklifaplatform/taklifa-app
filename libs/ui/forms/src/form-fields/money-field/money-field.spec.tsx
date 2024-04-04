import React from 'react';
import { render } from '@testing-library/react-native';

import { MoneyField } from './money-field';

describe('MoneyField', () => {
  it('should render successfully', () => {
    const { root } = render(<MoneyField />);
    expect(root).toBeTruthy();
  });
});
