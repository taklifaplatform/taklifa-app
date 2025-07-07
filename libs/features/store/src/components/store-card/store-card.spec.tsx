import React from 'react';
import { render } from '@testing-library/react-native';

import StoreCard from './store-card';

describe('StoreCard', () => {
  it('should render successfully', () => {
    const { root } = render(< StoreCard store={} showHeader={false} />);
    expect(root).toBeTruthy();
  });
});
