import React from 'react';
import { render } from '@testing-library/react-native';

import RadioField from './radio-field';

describe('RadioField', () => {
  it('should render successfully', () => {
    const { root } = render(< RadioField />);
    expect(root).toBeTruthy();
  });
});
