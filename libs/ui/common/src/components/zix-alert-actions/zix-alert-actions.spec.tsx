import React from 'react';
import { render } from '@testing-library/react-native';

import ZixAlertActions from './zix-alert-actions';

describe('ZixAlertActions', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixAlertActions />);
    expect(root).toBeTruthy();
  });
});
