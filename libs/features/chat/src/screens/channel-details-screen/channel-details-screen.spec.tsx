import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelDetailsScreen from './channel-details-screen';

describe('ChannelDetailsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelDetailsScreen />);
    expect(root).toBeTruthy();
  });
});
