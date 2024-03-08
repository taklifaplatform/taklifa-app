import React from 'react';
import { render } from '@testing-library/react-native';

import ZixWidgetContainer from './zix-widget-container';

describe('ZixWidgetContainer', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixWidgetContainer />);
    expect(root).toBeTruthy();
  });
});
