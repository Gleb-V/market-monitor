const Encore = require('@symfony/webpack-encore');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')

    /*
     * ENTRY CONFIG
     */
    .addEntry('app', './assets/main.tsx')

    .addAliases({
        '@': path.resolve(__dirname, 'assets'),
    })

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()
    // will require an extra script tag for runtime.js
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     */
    .cleanupOutputBeforeBuild()

    // uncomment if you use React
    .enableReactPreset()
    // uncomment if you use TypeScript
    .enableTypeScriptLoader()
    // enables Sass/SCSS support
    .enableSassLoader()

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.38';
    })

    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
;

const config = Encore.getWebpackConfig();

config.resolve.plugins = [
    new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'assets/tsconfig.json'),
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
];

module.exports = config;
