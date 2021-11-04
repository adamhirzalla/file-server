const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.listen(3001, ()=>{
  console.log(`Listening on port 3001...`);
});

server.on('connection', client=>{
  console.log('Client connected');
  client.write(`Connected to server\n`);
  
  client.setEncoding('utf8');
  
  client.write(`Type GET followed by the file path to request a file:\n`);

  client.on('data', path => {
    if (path.slice(0,4) === 'GET ') {
      fs.readFile(path.slice(4), 'utf8' , (err, data) => {
        if (err) {
          console.error(err);
          client.write('File does not exist - Terminating');
          client.end();
        } else {
          client.write(data);
          client.end();
        }
      });
    }
  });

  client.on('close', ()=>{
    console.log('Client disconnected');
  });
});