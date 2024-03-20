import React from 'react';
import { render } from '@testing-library/react-native';

import ZixCookiesBanner from './zix-cookies-banner';

describe('ZixCookiesBanner', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixCookiesBanner />);
    expect(root).toBeTruthy();
  });
});
