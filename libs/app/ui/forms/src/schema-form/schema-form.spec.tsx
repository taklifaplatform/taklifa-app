import React from 'react';
import { render } from '@testing-library/react-native';

import SchemaForm from './schema-form';

describe('SchemaForm', () => {
  it('should render successfully', () => {
    const { root } = render(< SchemaForm />);
    expect(root).toBeTruthy();
  });
});
