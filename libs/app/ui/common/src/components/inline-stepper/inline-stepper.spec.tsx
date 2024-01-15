import React from 'react';
import { render } from '@testing-library/react-native';

import InlineStepper from './inline-stepper';

describe('InlineStepper', () => {
  it('should render successfully', () => {
    const { root } = render(< InlineStepper />);
    expect(root).toBeTruthy();
  });
});
