import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMapPointerField from './zix-map-pointer-field';

describe('ZixMapPointerField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMapPointerField />);
    expect(root).toBeTruthy();
  });
});
