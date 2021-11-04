const net = require('net');
const readline = require('readline');
const {stdin: input, stdout:output} = require('process');


const conn = net.createConnection({
  host: 'localhost',
  port: 3001
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  console.log(data);
});

conn.on('connect', () => {
  // on successful connection:
  const rl = readline.createInterface({input,output});
  rl.on('line', path =>{
    if (path.slice(0,4) === 'GET ') {
      conn.write(path);
      rl.close();
    } else {
      console.log('Invalid Command - Terminating');
      process.exit();
    }
  });
});