import React from 'react';
import { render } from '@testing-library/react-native';

import WebsiteAppProvider from './website-app-provider';

describe('WebsiteAppProvider', () => {
  it('should render successfully', () => {
    const { root } = render(< WebsiteAppProvider />);
    expect(root).toBeTruthy();
  });
});
