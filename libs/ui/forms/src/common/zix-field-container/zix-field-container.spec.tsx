import React from 'react';
import { render } from '@testing-library/react-native';

import ZixFieldContainer from './zix-field-container';

describe('ZixFieldContainer', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixFieldContainer />);
    expect(root).toBeTruthy();
  });
});
