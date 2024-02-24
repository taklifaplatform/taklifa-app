import React from 'react';
import { render } from '@testing-library/react-native';

import BooleanSwitchField from './boolean-switch-field';

describe('BooleanSwitchField', () => {
  it('should render successfully', () => {
    const { root } = render(<BooleanSwitchField />);
    expect(root).toBeTruthy();
  });
});
