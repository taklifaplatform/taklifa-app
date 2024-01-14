import React from 'react';
import { render } from '@testing-library/react-native';

import SubmitButton from './submit-button';

describe('SubmitButton', () => {
  it('should render successfully', () => {
    const { root } = render(< SubmitButton />);
    expect(root).toBeTruthy();
  });
});
