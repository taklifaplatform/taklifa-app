import React from 'react';
import { render } from '@testing-library/react-native';

import MobileAppProvider from './mobile-app-provider';

describe('MobileAppProvider', () => {
  it('should render successfully', () => {
    const { root } = render(<MobileAppProvider> </MobileAppProvider>);
    expect(root).toBeTruthy();
  });
});
