import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelThreadsListScreen from './channel-threads-list-screen';

describe('ChannelThreadsListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelThreadsListScreen />);
    expect(root).toBeTruthy();
  });
});
