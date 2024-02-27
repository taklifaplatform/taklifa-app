import React from 'react';
import { render } from '@testing-library/react-native';

import MediaFile from './media-file';

describe('MediaFile', () => {
  it('should render successfully', () => {
    const { root } = render(< MediaFile />);
    expect(root).toBeTruthy();
  });
});
