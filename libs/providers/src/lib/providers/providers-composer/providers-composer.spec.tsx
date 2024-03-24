import React from 'react';
import { render } from '@testing-library/react-native';

import ProvidersComposer from './providers-composer';

describe('ProvidersComposer', () => {
  it('should render successfully', () => {
    const { root } = render(
      <ProvidersComposer providers={[]}></ProvidersComposer>,
    );
    expect(root).toBeTruthy();
  });
});
