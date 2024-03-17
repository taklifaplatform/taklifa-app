import React from 'react';
import { render } from '@testing-library/react-native';

import AccountSettingsMenu from './account-settings-menu';

describe('AccountSettingsMenu', () => {
  it('should render successfully', () => {
    const { root } = render(< AccountSettingsMenu />);
    expect(root).toBeTruthy();
  });
});
