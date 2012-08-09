var StreamRouter = require("../..")
    , streamRouter = StreamRouter()
    , MuxDemux = require("mux-demux")
    , net = require("net")

streamRouter.addRoute("/foo/:name", handleFoo)

net.createServer(handleTcp).listen(8642)

function handleTcp(con) {
    var mdm = MuxDemux({
        error: false
    })

    mdm.on("connection", streamRouter)

    con.pipe(mdm).pipe(con)
}

function handleFoo(stream, params) {
    stream.write(params.name)

    stream.on("data", console.log.bind(console, "server"))
}