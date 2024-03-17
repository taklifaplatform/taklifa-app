import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelImagesListScreen from './channel-images-list-screen';

describe('ChannelImagesListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelImagesListScreen />);
    expect(root).toBeTruthy();
  });
});
