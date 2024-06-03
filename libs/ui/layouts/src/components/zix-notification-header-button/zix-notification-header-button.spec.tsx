import React from 'react';
import { render } from '@testing-library/react-native';

import ZixNotificationHeaderButton from './zix-notification-header-button';

describe('ZixNotificationHeaderButton', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixNotificationHeaderButton />);
    expect(root).toBeTruthy();
  });
});
