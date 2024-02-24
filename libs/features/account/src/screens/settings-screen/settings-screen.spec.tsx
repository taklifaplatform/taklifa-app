import React from 'react';
import { render } from '@testing-library/react-native';

import SettingsScreen from './settings-screen';

describe('SettingsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<SettingsScreen />);
    expect(root).toBeTruthy();
  });
});
