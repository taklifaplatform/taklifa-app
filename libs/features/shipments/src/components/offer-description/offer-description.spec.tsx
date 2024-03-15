import React from 'react';
import { render } from '@testing-library/react-native';

import OfferDescription from './offer-description';

describe('OfferDescription', () => {
  it('should render successfully', () => {
    const { root } = render(< OfferDescription />);
    expect(root).toBeTruthy();
  });
});
