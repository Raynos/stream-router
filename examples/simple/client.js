var MuxDemux = require("mux-demux-net")
    , net = require("net")
    , mdm = MuxDemux(8642)

var foo = mdm.createStream("/foo/bar")

foo.on("data", console.log.bind(console, "client"))

foo.write("bar")