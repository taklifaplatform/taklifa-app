import React from 'react';
import { render } from '@testing-library/react-native';

import ZixRadioField from './zix-radio-field';

describe('ZixRadioField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixRadioField />);
    expect(root).toBeTruthy();
  });
});
