import React from 'react';
import { render } from '@testing-library/react-native';

import ChatChannelLayout from './chat-channel-layout';

describe('ChatChannelLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< ChatChannelLayout />);
    expect(root).toBeTruthy();
  });
});
