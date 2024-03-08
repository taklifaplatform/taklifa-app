import React from 'react';
import { render } from '@testing-library/react-native';

import PushNotification from './push-notification';

describe('PushNotification', () => {
  it('should render successfully', () => {
    const { root } = render(< PushNotification />);
    expect(root).toBeTruthy();
  });
});
