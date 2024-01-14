import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../../../libs/app/ui/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    // '../../../libs/ui/**/src/**/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    // '../../../libs/ui/**/src/**/**/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: [
          "solito",
          "expo-linking",
          "expo-constants",
          "expo-modules-core",
          "expo-document-picker",
          "expo-av",
          "expo-asset",
        ],
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      // builder: {
      //   useSWC: false,
      // },
    },
  },
  webpackFinal: async (config) => {
    // Remove export-order-loader since it doesn't work properly for CommonJS code
    // It currently appends ES code to CommonJS code resulting in a "exports is not defined" error
    // See https://github.com/storybookjs/storybook/issues/25383
    // This might result in the order of stories not corresponding to the order of exports,
    // although from my testing it doesn't seem to be the case and works fine without it
    // TODO: remove this fix once it is fixed in the library

    if (config.module?.rules) {
      config.module.rules = config.module.rules.filter(
        (rule) =>
          !rule?.use?.some?.((u) =>
            String(u?.loader)?.includes?.("export-order-loader")
          ),
      );
    }

    return config;
  },
  env: (config) => ({
    ...config,
    TAMAGUI_TARGET: 'web',
  }),
  docs: {
    autodocs: true,
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
