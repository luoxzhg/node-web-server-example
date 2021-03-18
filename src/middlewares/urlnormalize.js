const { normalize } = require('path')
const { parse, format } = require('url')

module.exports = function urlnormalizeMiddleware() {
    return (req, res, next) => {
        const pathname = normalize(req.path).split('\\').join('/')
        const urlParsed = parse(req.url)

        // 重定向不规范路径
        if (req.path !== pathname) {
            urlParsed.pathname = pathname
            res.redirect(format(urlParsed))
        } else {
            next()
        }
    }
}
