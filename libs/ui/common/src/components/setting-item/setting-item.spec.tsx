import React from 'react';
import { render } from '@testing-library/react-native';

import SettingItem from './setting-item';

describe('SettingItem', () => {
  it('should render successfully', () => {
    const { root } = render(<SettingItem />);
    expect(root).toBeTruthy();
  });
});
