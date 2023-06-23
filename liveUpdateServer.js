const { createServer } = require("http");
const fs = require('fs');

createServer((req, res) => {

    if(req.url == '/'){
        console.log('/')
        res.writeHead(200, {"Content-Type": "text/html"})
        fs.readFile('index.html','utf8',(error, file)=>{
            if(error) throw error;
            res.write(file)
            res.end()
            
        })
    }

    else if (req.url == "/sse"){
        console.count('sse')

        const head = {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        };
        res.writeHead(200, head);
        setInterval(() => {
            const d = new Date().toLocaleTimeString();
            // console.log(d)
            res.write(`data: ${d}\n\n`);
        }, 1000);
    }
    else{
        res.end("404 page not found")
    }
}).listen(3000, function () {
    console.log("Go to http://localhost:3000");
});
