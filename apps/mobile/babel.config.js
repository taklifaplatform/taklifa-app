module.exports = function (api) {
  api.cache(false);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": "../../.env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],
      'expo-router/babel',
      'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
          [
            '@tamagui/babel-plugin',
            {
              components: ['tamagui'],
              config: './tamagui.config.ts',
              logTimings: true,
              disableExtraction: process.env.NODE_ENV === 'development',
            },
          ]
        ]),
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
    ]
  };
};
