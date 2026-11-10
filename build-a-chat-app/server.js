import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;
const server = http.createServer((req, res)=>{
    fs.readFile("./public/index.html", "utf-8", (err, html)=>{

        if(err){
            res.writeHead(500, {"Content-Type": "text/plain"})
            return res.end("Could not load")
        }
          res.writeHead(200, {"Content-Type":"text/html"})
    res.end(html)
    })
  
})

const wss= new WebSocketServer({server})

function broadcast(message){
    const data= JSON.stringify(message)
    wss.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
            client.send(data)
        }
    })
}
wss.on("connection", (socket, req)=>{
    const username = new URL(req.url, "http://localhost").searchParams.get(
        "username"
    )

   broadcast({"type": "system", "text": `${username} joined`})

    socket.on("message",(data)=>{
        let parsed
        parsed= JSON.parse(data)

        const {username, text} = parsed
        broadcast({type: "chat", username, text})
    })

    socket.on("close", ()=>{
        broadcast({type:"system", text:`${username} left`})
    })

})

server.listen(PORT, ()=>{
    console.log(`Chat server running at http://localhost:${PORT}`)
})