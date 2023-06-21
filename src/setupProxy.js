const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/summoner', {
            target: process.env.REACT_APP_API_URL_KR + process.env.REACT_APP_API_URL_SUMMONER,
            changeOrigin: true,
            pathRewrite: {
                '^/summoner': '',
            },
        })
    )
    app.use(
        createProxyMiddleware('/match', {
            target: process.env.REACT_APP_API_URL_ASIA + process.env.REACT_APP_API_URL_MATCH,
            changeOrigin: true,
            pathRewrite: {
                '^/match': '',
            },
        })
    )
}
