module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        '@tamagui/babel-plugin',
        {
          components: [
            '@zix/app/themes/mobile',
            '@zix/app/themes/shared',
            '@zix/core/theme',
            'tamagui',
          ],
          config: './tamagui.config.ts',
          disable: true
        },
      ],
    ]
  };
};
