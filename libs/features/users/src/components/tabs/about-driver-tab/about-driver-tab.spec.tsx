import React from 'react';
import { render } from '@testing-library/react-native';

import AboutDriverTab from './about-driver-tab';

describe('AboutDriverTab', () => {
  it('should render successfully', () => {
    const { root } = render(<AboutDriverTab />);
    expect(root).toBeTruthy();
  });
});
