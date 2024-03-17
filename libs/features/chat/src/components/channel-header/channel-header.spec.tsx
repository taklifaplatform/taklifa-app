import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelHeader from './channel-header';

describe('ChannelHeader', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelHeader />);
    expect(root).toBeTruthy();
  });
});
