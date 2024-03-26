import React from 'react';
import { render } from '@testing-library/react-native';

import AdvancedAddressField from './advanced-address-field';

describe('AdvancedAddressField', () => {
  it('should render successfully', () => {
    const { root } = render(< AdvancedAddressField />);
    expect(root).toBeTruthy();
  });
});
