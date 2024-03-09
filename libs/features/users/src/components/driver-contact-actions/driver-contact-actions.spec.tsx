import React from 'react';
import { render } from '@testing-library/react-native';

import DriverContactActions from './driver-contact-actions';

describe('DriverContactActions', () => {
  it('should render successfully', () => {
    const { root } = render(<DriverContactActions />);
    expect(root).toBeTruthy();
  });
});
