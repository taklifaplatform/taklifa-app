import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelScreen from './channel-screen';

describe('ChannelScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelScreen />);
    expect(root).toBeTruthy();
  });
});
