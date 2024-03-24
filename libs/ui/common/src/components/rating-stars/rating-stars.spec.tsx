import React from 'react';
import { render } from '@testing-library/react-native';

import RatingStars from './rating-stars';

describe('RatingStars', () => {
  it('should render successfully', () => {
    const { root } = render(< RatingStars />);
    expect(root).toBeTruthy();
  });
});
