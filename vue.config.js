/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-03 15:32:38
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-04 09:21:35
 * @FilePath: /vue-cars/vue-cars-admin/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    /** vue3.0内置了webpack所有东西，
     * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     **/
    chainWebpack: (config) => {
        // const svgRule = config.module.rule("svg");     
        // svgRule.uses.clear();     
        // svgRule
        // .use("svg-sprite-loader")
        // .loader("svg-sprite-loader")
        // .options({ 
        //   symbolId: "icon-[name]",
        //   include: ["./src/icons"] 
        // });
    },
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.json', '.vue'],  // 自动添加文件名后缀
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components')
            }
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            }
        }
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
     */
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        hot: true,
        https: false,
        port: 8080,
        open: true,
        proxy: {
            // 匹配到/localApi开头时 替换成target指定的地址
            '/devApi': {
                // 本地
                target: process.env.VUE_APP_SRC1,
                secure: false, 
                changeOrigin: process.env.NODE_ENV === 'development' ? true : false, // 开发环境才开启反向代理, 生产环境不开启
                pathRewrite: {
                // 把匹配到的/localApi这段开头 替换成 /
                '^/devApi': ''
                },
                headers: {
                    referer: process.env.VUE_APP_SRC1, //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
                }
            },
        }
    },
    /**
     * 第三方插件配置
     */
    pluginOptions: {}
}