import React from 'react';
import { render } from '@testing-library/react-native';

import DefinitionSender from './definition-sender';

describe('DefinitionSender', () => {
  it('should render successfully', () => {
    const { root } = render(< DefinitionSender />);
    expect(root).toBeTruthy();
  });
});
