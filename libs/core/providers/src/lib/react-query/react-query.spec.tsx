import React from 'react';
import { render } from '@testing-library/react-native';

import QueryClientProvider from './react-query';

describe('QueryClientProvider', () => {
  it('should render successfully', () => {
    const { root } = render(<QueryClientProvider> </QueryClientProvider>);
    expect(root).toBeTruthy();
  });
});
