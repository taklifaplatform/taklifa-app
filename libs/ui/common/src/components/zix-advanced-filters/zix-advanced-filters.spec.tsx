import React from 'react';
import { render } from '@testing-library/react-native';

import ZixAdvancedFilters from './zix-advanced-filters';

describe('ZixAdvancedFilters', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixAdvancedFilters />);
    expect(root).toBeTruthy();
  });
});
