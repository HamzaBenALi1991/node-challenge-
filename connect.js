// seting up server 
const http =require('http')
const app = require ('./index')

// Setting up port 

const port = process.env.PORT ||3000 

const server = http.createServer(app)

server.listen(port)


  