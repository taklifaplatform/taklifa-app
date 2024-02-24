import React from 'react';
import { render } from '@testing-library/react-native';

import ZixSelectField from './zix-select-field';

describe('ZixSelectField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixSelectField />);
    expect(root).toBeTruthy();
  });
});
