import React from 'react';
import { render } from '@testing-library/react-native';

import ManageServiceScreen from './manage-service-screen';

describe('ManageServiceScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ManageServiceScreen />);
    expect(root).toBeTruthy();
  });
});
