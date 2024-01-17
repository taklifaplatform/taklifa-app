import { render } from '@testing-library/react-native';
import { createTamagui } from 'tamagui';

import { config } from '@tamagui/config/v2';
import TamaguiProvider from './tamagui';

const tamaguiConfig = createTamagui(config);

describe('Tamagui', () => {
  it('should render successfully', () => {
    const { root } = render(
      <TamaguiProvider config={tamaguiConfig}> </TamaguiProvider>
    );
    expect(root).toBeTruthy();
  });
});
