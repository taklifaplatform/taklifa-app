import React from 'react';
import { render } from '@testing-library/react-native';

import CountryField from './country-field';

describe('CountryField', () => {
  it('should render successfully', () => {
    const { root } = render(<CountryField />);
    expect(root).toBeTruthy();
  });
});
