import React from 'react';
import { render } from '@testing-library/react-native';

import OnboardingStepContent from './onboarding-step-content';

describe('OnboardingStepContent', () => {
  it('should render successfully', () => {
    const { root } = render(<OnboardingStepContent />);
    expect(root).toBeTruthy();
  });
});
