import React from 'react';
import { render } from '@testing-library/react-native';

import AnnouncementsListScreen from './announcements-list-screen';

describe('AnnouncementsListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< AnnouncementsListScreen />);
    expect(root).toBeTruthy();
  });
});
