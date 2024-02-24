import React from 'react';
import { render } from '@testing-library/react-native';

import SelectField from './select-field';

describe('SelectField', () => {
  it('should render successfully', () => {
    const { root } = render(<SelectField />);
    expect(root).toBeTruthy();
  });
});
