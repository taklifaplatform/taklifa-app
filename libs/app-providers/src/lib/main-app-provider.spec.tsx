import React from 'react';
import { render } from '@testing-library/react-native';

import MainAppProvider from './main-app-provider';

describe('MainAppProvider', () => {
  it('should render successfully', () => {
    const { root } = render(< MainAppProvider > </MainAppProvider>);
    expect(root).toBeTruthy();
  });
});
