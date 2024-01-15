import React from 'react';
import { render } from '@testing-library/react-native';

import ZixAutoCompleteField from './zix-auto-complete-field';

describe('ZixAutoCompleteField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixAutoCompleteField />);
    expect(root).toBeTruthy();
  });
});
