import React from 'react';
import { render } from '@testing-library/react-native';

import CustomToast from './custom-toast';

describe('CustomToast', () => {
  it('should render successfully', () => {
    const { root } = render(< CustomToast />);
    expect(root).toBeTruthy();
  });
});
