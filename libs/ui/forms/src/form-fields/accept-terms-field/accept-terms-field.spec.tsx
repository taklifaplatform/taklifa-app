import React from 'react';
import { render } from '@testing-library/react-native';

import AcceptTermsField from './accept-terms-field';

describe('AcceptTermsField', () => {
  it('should render successfully', () => {
    const { root } = render(<AcceptTermsField />);
    expect(root).toBeTruthy();
  });
});
