import React from 'react';
import { render } from '@testing-library/react-native';

import GroupFieldsSheet from './group-fields-sheet';

describe('GroupFieldsSheet', () => {
  it('should render successfully', () => {
    const { root } = render(< GroupFieldsSheet />);
    expect(root).toBeTruthy();
  });
});
