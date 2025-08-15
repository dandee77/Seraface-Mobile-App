const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add resolver for production builds
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

// Add better error handling for metro bundler
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    // Disable some optimizations that might cause issues
    keep_fnames: true,
  },
};

module.exports = withNativeWind(config, {
  input: "./global.css",
  configPath: "./tailwind.config.js",
  // Add production optimizations
  inlineRem: false,
  transformOrigin: false,
});