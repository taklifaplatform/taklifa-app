import React from 'react';
import { render } from '@testing-library/react-native';

import MarkdownEditorField from './markdown-editor-field';

describe('MarkdownEditorField', () => {
  it('should render successfully', () => {
    const { root } = render(< MarkdownEditorField />);
    expect(root).toBeTruthy();
  });
});
