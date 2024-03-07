import React from 'react';
import { render } from '@testing-library/react-native';

import ZixVariantOptionsWidget from './zix-variant-options--widget';

describe('ZixVariantOptionsWidget', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixVariantOptionsWidget />);
    expect(root).toBeTruthy();
  });
});
