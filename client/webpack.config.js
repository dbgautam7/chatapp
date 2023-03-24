const Dotenv = require('dotenv-webpack');
module.exports = {
    // ... other webpack config options
    plugins: [
      // ... other plugins
      new Dotenv({
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      }),
    ],
  };
  