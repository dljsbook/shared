// const typescript = require('rollup-plugin-typescript2');
// const resolve = require('rollup-plugin-node-resolve');

module.exports = (options = {}, plugins) => {
  if (!options.output) {
    throw new Error('You must provide an output field');
  }
  if (!options.input) {
    throw new Error('You must provide an input field');
  }

  const includes = options.includes;

  delete options.includes;

  return Object.assign(options, {
    plugins: [
      plugins.resolve({
        module: true, // Default: true

        // - see: https://github.com/rollup/rollup/wiki/pkg.module
        jsnext: true,  // Default: false

        // – see https://github.com/rollup/rollup-plugin-commonjs
        main: true,  // Default: true

        browser: true,  // Default: false

        extensions: [ '.mjs', '.js', '.jsx', '.json' ],  // Default: [ '.mjs', '.js', '.json', '.node' ]

        preferBuiltins: false,  // Default: true

        // Set to an array of strings and/or regexps to lock the module search
        // to modules that match at least one entry. Modules not matching any
        // entry will be marked as external
        only: includes || [],
      }),
      plugins.typescript({
      }),
    ].concat(options.plugins || []),
  });
};



