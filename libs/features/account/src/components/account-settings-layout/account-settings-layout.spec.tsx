import React from 'react';
import { render } from '@testing-library/react-native';

import AccountSettingsLayout from './account-settings-layout';

describe('AccountSettingsLayout', () => {
  it('should render successfully', () => {
    const { root } = render(<AccountSettingsLayout />);
    expect(root).toBeTruthy();
  });
});
