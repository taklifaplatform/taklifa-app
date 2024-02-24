import React from 'react';
import { render } from '@testing-library/react-native';

import OnboardingScreen from './onboarding-screen';

describe('OnboardingScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<OnboardingScreen />);
    expect(root).toBeTruthy();
  });
});
