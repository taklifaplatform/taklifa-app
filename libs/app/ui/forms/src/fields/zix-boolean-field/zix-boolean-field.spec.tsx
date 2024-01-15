import React from 'react';
import { render } from '@testing-library/react-native';

import ZixBooleanField from './zix-boolean-field';

describe('ZixBooleanField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixBooleanField />);
    expect(root).toBeTruthy();
  });
});
