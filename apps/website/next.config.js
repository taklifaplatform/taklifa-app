//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withTamagui } = require('@tamagui/next-plugin')
const withSvgr = require('next-plugin-svgr');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'solito',
    'react-native-web',
    'expo-linking',
    'expo-crypto',
    'expo-constants',
    'expo-modules-core',
    'expo-image-picker',
    'expo-document-picker',
    'expo-web-browser',
    'react-native-gesture-handler',
    'react-native-markdown-display',

    'stream-chat',
  ],
  images: {
    remotePatterns: [
      {
        hostname: 'ui-avatars.com',
      },
      {
        hostname: 'i.pravatar.cc',
      },
      {
        hostname: 'localhost',
      },
      {
        hostname: '192.168.0.23',
      },
      {
        hostname: 'admin-sawaeed.zixdev.com'
      }
    ],
  },
};



const tamaguiPlugin = withTamagui({
  platform: 'web',
  // themeBuilder: {
  //   input: '../../libs/theme/src/lib/sawaeed-theme/themes/theme.ts',
  //   output: '../../libs/theme/src/lib/sawaeed-theme/themes.ts',
  // },

  config: './tamagui.config.ts',
  components: ['tamagui'],
  // build-time generate CSS styles for better performance
  // we recommend only using this for production so you get reloading during dev mode
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,


  // disableExtraction: true
})

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withSvgr,
  tamaguiPlugin,
];

module.exports = composePlugins(...plugins)(nextConfig);
