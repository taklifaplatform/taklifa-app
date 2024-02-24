import React from 'react';
import { render } from '@testing-library/react-native';

import FieldContainer from './field-container';

describe('FieldContainer', () => {
  it('should render successfully', () => {
    const { root } = render(<FieldContainer />);
    expect(root).toBeTruthy();
  });
});
