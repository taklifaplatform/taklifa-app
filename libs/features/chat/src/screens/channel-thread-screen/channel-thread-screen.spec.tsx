import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelThreadScreen from './channel-thread-screen';

describe('ChannelThreadScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelThreadScreen />);
    expect(root).toBeTruthy();
  });
});
