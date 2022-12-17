const postcss = require('rollup-plugin-postcss');
const images = require('@rollup/plugin-image');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: true, // 这里改为了 true
        extract: !!options.writeMeta,
      })
    );
    config.plugins = [
      images({ incude: ['**/*.png', '**/*.jpg'] }),
      ...config.plugins,
    ];
    return config;
  },
};