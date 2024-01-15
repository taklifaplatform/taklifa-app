import React from 'react';
import { render } from '@testing-library/react-native';

import ZixRichEditorField from './zix-rich-editor-field';

describe('ZixRichEditorField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixRichEditorField />);
    expect(root).toBeTruthy();
  });
});
