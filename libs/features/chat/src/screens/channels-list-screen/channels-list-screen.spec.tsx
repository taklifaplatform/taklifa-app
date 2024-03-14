import React from 'react';
import { render } from '@testing-library/react-native';

import ChannelsListScreen from './channels-list-screen';

describe('ChannelsListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ChannelsListScreen />);
    expect(root).toBeTruthy();
  });
});
