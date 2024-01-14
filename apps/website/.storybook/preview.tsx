import { Preview } from '@storybook/react';
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
// import { themes } from '@zix/app/themes/website';
import 'raf/polyfill';
import { StorybookTGProvider } from './decorator';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      title: 'Theme',
      description: 'Theme for your components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'light', left: '☀️', title: 'Light Mode' },
          { value: 'dark', left: '🌙', title: 'Dark Mode' }
        ]
      }
    }
  },
  decorators: [
    (Story, args: any = {}) => {
      // The theme global we just declared
      const { theme: themeKey } = args.globals;
      // const name = useThemeState((state) => state.name)
      let theme = themeKey;
      if (
        !theme &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        // dark mode
        theme = 'dark';
      }
      console.log('=================');
      console.log('StorybookTGProvider->RENDER', args);
      console.log('=================');
      return (
        <StorybookTGProvider>
          <Story {...args} />
        </StorybookTGProvider>
      );
    }
  ]
};

export default preview;
