import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMediasList from './zix-medias-list';

describe('ZixMediasList', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMediasList />);
    expect(root).toBeTruthy();
  });
});
