import React from 'react';
import { render } from '@testing-library/react-native';

import FieldError from './field-error';

describe('FieldError', () => {
  it('should render successfully', () => {
    const { root } = render(<FieldError />);
    expect(root).toBeTruthy();
  });
});
