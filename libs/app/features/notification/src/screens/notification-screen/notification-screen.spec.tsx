import React from 'react';
import { render } from '@testing-library/react-native';

import NotificationScreen from './notification-screen';

describe('NotificationScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< NotificationScreen />);
    expect(root).toBeTruthy();
  });
});
