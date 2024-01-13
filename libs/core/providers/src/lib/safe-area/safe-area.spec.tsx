import React from 'react';
import { render } from '@testing-library/react-native';

import SafeAreaProvider from './safe-area';

describe('SafeAreaProvider', () => {
  it('should render successfully', () => {
    const { root } = render(<SafeAreaProvider> </SafeAreaProvider>);
    expect(root).toBeTruthy();
  });
});
