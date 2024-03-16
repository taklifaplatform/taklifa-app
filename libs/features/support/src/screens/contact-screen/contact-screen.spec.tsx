import React from 'react';
import { render } from '@testing-library/react-native';

import ContactScreen from './contact-screen';

describe('ContactScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ContactScreen />);
    expect(root).toBeTruthy();
  });
});
