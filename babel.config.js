module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/typescript'],
    plugins: ['inline-dotenv'],
  };
};
