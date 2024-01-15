import React from 'react';
import { render } from '@testing-library/react-native';

import TextAreaField from './text-area-field';

describe('TextAreaField', () => {
  it('should render successfully', () => {
    const { root } = render(< TextAreaField />);
    expect(root).toBeTruthy();
  });
});
