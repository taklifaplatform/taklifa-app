import React from 'react';
import { render } from '@testing-library/react-native';

import CombinedChatScreen from './combined-chat-screen';

describe('CombinedChatScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CombinedChatScreen />);
    expect(root).toBeTruthy();
  });
});
