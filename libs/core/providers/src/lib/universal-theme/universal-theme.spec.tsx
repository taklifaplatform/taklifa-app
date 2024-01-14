import React from 'react';
import { render } from '@testing-library/react-native';

import UniversalTheme from './universal-theme';

describe('UniversalTheme', () => {
  it('should render successfully', () => {
    const { root } = render(<UniversalTheme> </UniversalTheme>);
    expect(root).toBeTruthy();
  });
});
