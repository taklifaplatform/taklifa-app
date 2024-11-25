import React from 'react';
import { render } from '@testing-library/react-native';

import SelectRowOptionField from './select-row-option-field';

describe('SelectRowOptionField', () => {
  it('should render successfully', () => {
    const { root } = render(<SelectRowOptionField />);
    expect(root).toBeTruthy();
  });
});
