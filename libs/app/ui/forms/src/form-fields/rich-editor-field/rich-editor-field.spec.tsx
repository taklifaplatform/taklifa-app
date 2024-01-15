import React from 'react';
import { render } from '@testing-library/react-native';

import RichEditorField from './rich-editor-field';

describe('RichEditorField', () => {
  it('should render successfully', () => {
    const { root } = render(< RichEditorField />);
    expect(root).toBeTruthy();
  });
});
