import React from 'react';
import { render } from '@testing-library/react-native';

import ZixSelectRadioGroupnField from './zix-select-radio-group-field';

describe('ZixSelectRadioGroupnField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixSelectRadioGroupnField />);
    expect(root).toBeTruthy();
  });
});
