var StreamRouter = require("../..")
    , streamRouter = StreamRouter()
    , MuxDemux = require("mux-demux-net")

streamRouter.addRoute("/foo/:name", handleFoo)

var server = MuxDemux(streamRouter, 8642)

function handleFoo(stream, params) {
    stream.write(params.name)

    stream.on("data", console.log.bind(console, "server"))
}