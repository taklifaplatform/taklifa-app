import React from 'react';
import { render } from '@testing-library/react-native';

import AcceptTermsLink from './accept-terms-link';

describe('AcceptTermsLink', () => {
  it('should render successfully', () => {
    const { root } = render(< AcceptTermsLink />);
    expect(root).toBeTruthy();
  });
});
