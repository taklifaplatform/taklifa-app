import React from 'react';
import { render } from '@testing-library/react-native';

import AvatarField from './avatar-field';

describe('AvatarField', () => {
  it('should render successfully', () => {
    const { root } = render(< AvatarField />);
    expect(root).toBeTruthy();
  });
});
