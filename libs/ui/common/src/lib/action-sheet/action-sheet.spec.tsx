import React from 'react';
import { render } from '@testing-library/react-native';

import ActionSheet from './action-sheet';

describe('ActionSheet', () => {
  it('should render successfully', () => {
    const { root } = render(<ActionSheet />);
    expect(root).toBeTruthy();
  });
});
