import React from 'react';
import { render } from '@testing-library/react-native';

import PhoneField from './phone-field';

describe('PhoneField', () => {
  it('should render successfully', () => {
    const { root } = render(< PhoneField />);
    expect(root).toBeTruthy();
  });
});
