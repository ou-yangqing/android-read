module.exports = {
    configureWebpack: {
        devServer: {
        	proxy: {
                "/api": {
                    target: "http://img.andreader.com",
                    pathRewrite: {"^/api": ""},
                    changeOrigin: true
                }
            }
        }
    }
}
