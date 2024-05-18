import React from 'react';
import { render } from '@testing-library/react-native';

import UserRoleListItem from './user-role-list-item';

describe('UserRoleListItem', () => {
  it('should render successfully', () => {
    const { root } = render(< UserRoleListItem />);
    expect(root).toBeTruthy();
  });
});
