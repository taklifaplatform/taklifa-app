import React from 'react';
import { render } from '@testing-library/react-native';

import ZixSelectRowOptionField from './zix-select-row-option-field';

describe('ZixSelectRowOptionField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixSelectRowOptionField />);
    expect(root).toBeTruthy();
  });
});
