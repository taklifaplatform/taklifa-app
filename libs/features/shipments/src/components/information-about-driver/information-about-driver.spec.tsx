import React from 'react';
import { render } from '@testing-library/react-native';

import InformationAboutDriver from './information-about-driver';

describe('InformationAboutDriver', () => {
  it('should render successfully', () => {
    const { root } = render(< InformationAboutDriver />);
    expect(root).toBeTruthy();
  });
});
