import React from 'react';
import { render } from '@testing-library/react-native';

import ZixCountryField from './zix-country-field';

describe('ZixCountryField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixCountryField />);
    expect(root).toBeTruthy();
  });
});
