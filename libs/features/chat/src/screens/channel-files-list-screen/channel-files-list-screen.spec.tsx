import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelFilesListScreen from './channel-files-list-screen';

describe('ChannelFilesListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelFilesListScreen />);
    expect(root).toBeTruthy();
  });
});
