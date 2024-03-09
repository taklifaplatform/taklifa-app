import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMediasListWidget from './zix-medias-list-widget';

describe('ZixMediasListWidget', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMediasListWidget />);
    expect(root).toBeTruthy();
  });
});
