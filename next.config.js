const withTypescript = require("@zeit/next-typescript");

const path = require("path");

module.exports = withTypescript({
    webpack(config) {
        config.resolve.alias["@lib"] = path.resolve("./lib");
        return config;
    },
});
