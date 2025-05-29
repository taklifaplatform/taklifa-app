import { Preview } from '@storybook/react';
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
// import { themes } from '@zix/app/themes/website';
import 'raf/polyfill';
import { StorybookDecorator } from './decorator';

const preview: Preview = {
  globalTypes: {
    // theme: {
    //   name: 'Theme',
    //   title: 'Theme',
    //   description: 'Theme for your components',
    //   defaultValue: 'light',
    //   toolbar: {
    //     icon: 'paintbrush',
    //     dynamicTitle: true,
    //     items: [
    //       { value: 'light', left: '☀️', title: 'Light Mode' },
    //       { value: 'dark', left: '🌙', title: 'Dark Mode' }
    //     ]
    //   }
    // }
  },

  decorators: [StorybookDecorator],
  tags: ['autodocs']
};

export default preview;
