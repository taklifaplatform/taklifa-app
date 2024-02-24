import React from 'react';
import { render } from '@testing-library/react-native';

import AutoCompleteField from './auto-complete-field';

describe('AutoCompleteField', () => {
  it('should render successfully', () => {
    const { root } = render(<AutoCompleteField />);
    expect(root).toBeTruthy();
  });
});
