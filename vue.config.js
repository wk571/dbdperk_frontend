module.exports = {
    publicPath: './', // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 
    devServer: {
      open: true,
      host: '127.0.0.1',
      port: 8080,
      // https: false,
      // hotOnly: false,
      proxy: {
        // 配置跨域
        '/api': {
          target: 'http://127.0.0.1:8701',
          ws: true,
          changOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
  
  