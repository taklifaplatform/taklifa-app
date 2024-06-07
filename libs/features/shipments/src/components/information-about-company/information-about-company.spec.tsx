import React from 'react';
import { render } from '@testing-library/react-native';

import InformationAboutCompany from './information-about-company';

describe('InformationAboutCompany', () => {
  it('should render successfully', () => {
    const { root } = render(< InformationAboutCompany />);
    expect(root).toBeTruthy();
  });
});
