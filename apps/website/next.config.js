//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withTamagui } = require('@tamagui/next-plugin')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const tamaguiPlugin = withTamagui({
  // config: './tamagui.config.ts',
  components: ['tamagui'],
  // build-time generate CSS styles for better performance
  // we recommend only using this for production so you get reloading during dev mode
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,

  // optional advanced settings:

  // set to false if you never call addTheme or updateTheme
  // when combined with outputCSS this saves you 1Kb more bundle size
  doesMutateThemes: true, // default true
})

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  tamaguiPlugin,
];

module.exports = composePlugins(...plugins)(nextConfig);
