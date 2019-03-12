const path = require('path')
const chalk = require('chalk')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

// 存放build结果的文件夹(主要是为了填prerender在配置了baseUrl后带来的坑,下面会说)
const DIST_ROOT = 'dist'

// 项目部署在服务器里的绝对路径，默认'/'，参考https://cli.vuejs.org/zh/config/#baseurl
const BASE_URL = '/'
// 转为CND外链方式的npm包，键名是import的npm包名，键值是该库暴露的全局变量，参考https://webpack.js.org/configuration/externals/#src/components/Sidebar/Sidebar.jsx
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
    ]
  }
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: BASE_URL,
  outputDir: DIST_ROOT + BASE_URL, // prerendner会借助一个express服务器来预渲染，改变baseUrl后要保证这个模拟服务器能够找到所需的资源
  assetsDir: 'app',
  productionSourceMap: false,
  configureWebpack: config => {
    const myConfig = {}
    if (isProduction) {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals
      // 2. 使用预渲染，在仅加载html和css之后即可显示出基础的页面，提升用户体验，避免白屏
      myConfig.plugins = []
      
      // 3. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    if (isDevelopment) {
      //关闭host check，方便使用ngrok之类的内网转发工具
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  },
  chainWebpack: config => {
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config
      .plugin('html')
      .tap(args => {
        if (isProduction) {
          args[0].cdn = cdn.build
        }
        if (isDevelopment) {
          args[0].cdn = cdn.dev
        }
        return args
      })
    /**
     * 无需使用@import在每个scss文件中引入变量或者mixin，也可以避免大量@import导致build变慢
     * sass-resources-loader 文档链接：https://github.com/shakacode/sass-resources-loader
     */
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    const sassResources = ['color.scss', 'mixin.scss', 'common.scss'] // scss资源文件，可以在里面定义变量，mixin,全局混入样式等
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: sassResources.map(file => path.resolve(__dirname, 'src/assets/style/' + file))
        })
        .end()
    })
  }
}
