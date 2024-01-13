import React from 'react';
import { render } from '@testing-library/react-native';

import AdminAppProvider from './admin-app-provider';

describe('AdminAppProvider', () => {
  it('should render successfully', () => {
    const { root } = render(< AdminAppProvider />);
    expect(root).toBeTruthy();
  });
});
