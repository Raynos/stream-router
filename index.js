var Router = require("routes").Router

module.exports = StreamRouter

function StreamRouter(errorHandler) {
    errorHandler = errorHandler || log
    var router = new Router()

    streamHandler.addRoute = router.addRoute.bind(router)
    streamHandler.match = router.match.bind(router)

    return streamHandler

    function streamHandler(stream) {
        var route = router.match(stream.meta)

        stream.on("error", errorHandler)

        if (!route) {
            stream.error("404: invalid route: " + stream.meta)
            return stream.end()
        }
        route.fn(stream, route.params)
    }
}

function log(error) {
    console.log("[ERROR IN STREAM-ROUTER]", error)
}