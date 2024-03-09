import React from 'react';
import { render } from '@testing-library/react-native';

import UserCard from './user-card';

describe('UserCard', () => {
  it('should render successfully', () => {
    const { root } = render(<UserCard />);
    expect(root).toBeTruthy();
  });
});
