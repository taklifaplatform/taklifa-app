import React from 'react';
import { render } from '@testing-library/react-native';

import FileField from './file-field';

describe('FileField', () => {
  it('should render successfully', () => {
    const { root } = render(< FileField />);
    expect(root).toBeTruthy();
  });
});
