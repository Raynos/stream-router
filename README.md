# stream-router

Easy router for routing streams

## Example Server

``` js
var StreamRouter = require("stream-router")
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
```

## Example client

``` js
var MuxDemux = require("mux-demux")
    , net = require("net")
    , mdm = MuxDemux({
        error: false
    })
    , con = net.connect(8642)

con.pipe(mdm).pipe(con)

var foo = mdm.createStream("/foo/bar")

foo.on("data", console.log.bind(console, "client"))

foo.write("bar")
```

## Installation

`npm install stream-router`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/stream-router.png
  [2]: http://travis-ci.org/Raynos/stream-router