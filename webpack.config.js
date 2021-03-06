const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const config = {
  entry: {
    app: './public/index.js',
    db: './public/db.js',
  },
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: '[name].bundle.js',
  },
  mode: 'production',
  plugins: [
    new WebpackPwaManifest({
      // the name of the generated manifest file
      filename: 'manifest.json',

      // we aren't using webpack to generate our html so we
      // set inject to false
      inject: false,

      // set fingerprints to `false` to make the names of the generated
      // files predictable making it easier to refer to them in our code
      fingerprints: false,

      name: 'Budget Tracker',
      short_name: 'Budget Tracker',
      description:
        'An application that allows you to add expenses and deposits to a budget.',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',

      icons: [
        {
          src: path.resolve(__dirname, 'public/icons/icon-192x192.png'),
          // the plugin will generate an image for each size
          // included in the size array
          size: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
      // configure webpack to use babel-loader to bundle our separate modules and transpile the code
      // refer to https://github.com/babel/babel-loader for more information on the settings
      module: {
        rules: [
          {
            test: /\.js$/, // files must end in ".js" to be transpiled
            exclude: /node_modules/, // don't transpile code from "node_modules"
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      },
    }),
  ],
};

module.exports = config;
