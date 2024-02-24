import React from 'react';
import { render } from '@testing-library/react-native';

import InlineItemSelect from './inline-item-select';

describe('InlineItemSelect', () => {
  it('should render successfully', () => {
    const { root } = render(<InlineItemSelect />);
    expect(root).toBeTruthy();
  });
});
