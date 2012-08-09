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