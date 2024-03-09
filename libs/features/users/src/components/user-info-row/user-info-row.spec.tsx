import React from 'react';
import { render } from '@testing-library/react-native';

import UserInfoRow from './user-info-row';

describe('UserInfoRow', () => {
  it('should render successfully', () => {
    const { root } = render(<UserInfoRow user={{}} />);
    expect(root).toBeTruthy();
  });
});
