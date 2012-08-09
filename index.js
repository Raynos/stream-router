var Router = require("routes").Router

module.exports = StreamRouter

function StreamRouter() {
    var router = new Router()

    streamHandler.addRoute = router.addRoute.bind(router)
    streamHandler.match = router.match.bind(router)

    return streamHandler

    function streamHandler(stream) {
        var route = router.match(stream.meta)
        if (!route) {
            return stream.end()
        }
        route.fn(stream, route.params)
    }
}