import React from 'react';
import { render } from '@testing-library/react-native';

import RatingCard from './rating-card';

describe('RatingCard', () => {
  it('should render successfully', () => {
    const { root } = render(< RatingCard />);
    expect(root).toBeTruthy();
  });
});
