import React from 'react';
import { render } from '@testing-library/react-native';

import BooleanCheckboxField from './boolean-checkbox-field';

describe('BooleanCheckboxField', () => {
  it('should render successfully', () => {
    const { root } = render(< BooleanCheckboxField />);
    expect(root).toBeTruthy();
  });
});
