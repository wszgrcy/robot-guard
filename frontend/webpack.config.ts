const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export default (config:any, options:any, targetOptions:any) => {
  config.plugins.push(new MonacoWebpackPlugin({ languages: ['typescript', 'javascript'] }));

  const loaders: any[] = config.module.rules.filter(
    (rule:any) =>
      rule.use &&
      rule.use.find(
        (it:any) =>
          it.loader && (it.loader.includes("@angular-devkit\\build-optimizer") || it.loader.includes("@angular-devkit/build-optimizer"))
      )
  );
  loaders.forEach((loader) => {
    const originalTest = loader.test;
    loader.test = (file:any) => {
      const isMonaco = !!file.match("monaco-editor");
      return !isMonaco && !!file.match(originalTest);
    };
  });

  return config;
};
