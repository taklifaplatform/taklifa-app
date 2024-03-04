import React from 'react';
import { render } from '@testing-library/react-native';

import FormFieldContainer from './form-field-container';

describe('FormFieldContainer', () => {
  it('should render successfully', () => {
    const { root } = render(<FormFieldContainer />);
    expect(root).toBeTruthy();
  });
});
