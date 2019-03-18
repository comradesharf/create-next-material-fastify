const withTypescript = require("next-with-typescript");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = withTypescript({
    webpack(config) {
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin(),
        ];
        return config;
    },
});
