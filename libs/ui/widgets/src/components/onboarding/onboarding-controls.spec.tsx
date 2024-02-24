import React from 'react';
import { render } from '@testing-library/react-native';

import OnboardingControls from './onboarding-controls';

describe('OnboardingControls', () => {
  it('should render successfully', () => {
    const { root } = render(<OnboardingControls />);
    expect(root).toBeTruthy();
  });
});
