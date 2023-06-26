const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/kr', {
            target: process.env.REACT_APP_API_URL_KR,
            changeOrigin: true,
            pathRewrite: {
                '^/kr': '',
            },
        })
    )
    app.use(
        createProxyMiddleware('/asia', {
            target: process.env.REACT_APP_API_URL_ASIA,
            changeOrigin: true,
            pathRewrite: {
                '^/asia': '',
            },
        })
    )
}
