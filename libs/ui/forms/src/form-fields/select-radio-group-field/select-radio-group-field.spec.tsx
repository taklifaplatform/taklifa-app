import React from 'react';
import { render } from '@testing-library/react-native';

import SelectRadioGroupField from './select-radio-group-field';

describe('SelectRadioGroupField', () => {
  it('should render successfully', () => {
    const { root } = render(<SelectRadioGroupField />);
    expect(root).toBeTruthy();
  });
});
