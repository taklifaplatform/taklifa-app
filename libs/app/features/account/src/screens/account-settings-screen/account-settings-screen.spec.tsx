import React from 'react';
import { render } from '@testing-library/react-native';

import AccountSettingsScreen from './account-settings-screen';

describe('AccountSettingsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< AccountSettingsScreen />);
    expect(root).toBeTruthy();
  });
});
