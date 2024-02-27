import React from 'react';
import { render } from '@testing-library/react-native';

import ZixSheet from './zix-sheet';

describe('ZixSheet', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixSheet />);
    expect(root).toBeTruthy();
  });
});
