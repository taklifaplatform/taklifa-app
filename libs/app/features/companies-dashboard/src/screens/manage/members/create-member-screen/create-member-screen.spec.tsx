import React from 'react';
import { render } from '@testing-library/react-native';

import CreateManagerScreen from './create-manager-screen';

describe('CreateManagerScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CreateManagerScreen />);
    expect(root).toBeTruthy();
  });
});
