import React from 'react';
import { render } from '@testing-library/react-native';

import AddressField from './address-field';

describe('AddressField', () => {
  it('should render successfully', () => {
    const { root } = render(< AddressField />);
    expect(root).toBeTruthy();
  });
});
