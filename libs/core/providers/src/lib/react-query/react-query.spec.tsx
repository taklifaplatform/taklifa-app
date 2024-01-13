import React from 'react';
import { render } from '@testing-library/react-native';

import ReactQuery from './react-query';

describe('ReactQuery', () => {
  it('should render successfully', () => {
    const { root } = render(< ReactQuery />);
    expect(root).toBeTruthy();
  });
});
