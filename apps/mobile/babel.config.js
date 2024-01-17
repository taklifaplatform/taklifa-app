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
      [
        '@tamagui/babel-plugin',
        {
          components: [
            // '@zix/app/themes/mobile',
            // '@zix/app/themes/shared',
            // '@zix/core/theme',
            'tamagui',
          ],
          config: './tamagui.config.ts',
          disable: true
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
    ]
  };
};
