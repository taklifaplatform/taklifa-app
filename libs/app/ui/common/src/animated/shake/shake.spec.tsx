import React from 'react';
import { render } from '@testing-library/react-native';

import Shake from './shake';

describe('Shake', () => {
  it('should render successfully', () => {
    const { root } = render(< Shake />);
    expect(root).toBeTruthy();
  });
});
