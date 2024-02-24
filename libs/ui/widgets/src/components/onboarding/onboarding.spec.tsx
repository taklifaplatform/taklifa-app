import React from 'react';
import { render } from '@testing-library/react-native';

import Onboarding from './onboarding';

describe('Onboarding', () => {
  it('should render successfully', () => {
    const { root } = render(<Onboarding />);
    expect(root).toBeTruthy();
  });
});
