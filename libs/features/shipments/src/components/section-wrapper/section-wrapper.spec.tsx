import React from 'react';
import { render } from '@testing-library/react-native';

import SectionWrapper from './section-wrapper';

describe('SectionWrapper', () => {
  it('should render successfully', () => {
    const { root } = render(< SectionWrapper > </SectionWrapper>);
    expect(root).toBeTruthy();
  });
});
