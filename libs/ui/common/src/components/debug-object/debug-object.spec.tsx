import React from 'react';
import { render } from '@testing-library/react-native';

import DebugObject from './debug-object';

describe('DebugObject', () => {
  it('should render successfully', () => {
    const { root } = render(< DebugObject />);
    expect(root).toBeTruthy();
  });
});
