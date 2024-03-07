import React from 'react';
import { render } from '@testing-library/react-native';

import ZixButton from './zix-link-button';

describe('ZixButton', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixButton />);
    expect(root).toBeTruthy();
  });
});
