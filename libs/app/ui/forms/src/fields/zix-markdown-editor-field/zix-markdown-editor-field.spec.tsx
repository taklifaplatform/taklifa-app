import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMarkdownEditorField from './zix-markdown-editor-field';

describe('ZixMarkdownEditorField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMarkdownEditorField />);
    expect(root).toBeTruthy();
  });
});
