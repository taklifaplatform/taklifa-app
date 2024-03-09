import React from 'react';
import { render } from '@testing-library/react-native';

import UserContactActions from './user-contact-actions';

describe('UserContactActions', () => {
  it('should render successfully', () => {
    const { root } = render(<UserContactActions user={{}} />);
    expect(root).toBeTruthy();
  });
});
