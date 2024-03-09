import React from 'react';
import { render } from '@testing-library/react-native';

import AboutUserTab from './about-user-tab';

describe('AboutUserTab', () => {
  it('should render successfully', () => {
    const { root } = render(<AboutUserTab />);
    expect(root).toBeTruthy();
  });
});
