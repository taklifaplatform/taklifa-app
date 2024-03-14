import React from 'react';
import { render } from '@testing-library/react-native';

import ChatChannelThreadLayout from './chat-channel-thread-layout';

describe('ChatChannelThreadLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< ChatChannelThreadLayout />);
    expect(root).toBeTruthy();
  });
});
