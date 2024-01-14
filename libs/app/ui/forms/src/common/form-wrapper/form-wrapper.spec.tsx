import { render } from '@testing-library/react-native';

import FormWrapper from './form-wrapper';

describe('FormWrapper', () => {
  it('should render successfully', () => {
    const { root } = render(< FormWrapper />);
    expect(root).toBeTruthy();
  });
});
