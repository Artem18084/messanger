const net = require("net");

const clients = [];
const memory = [];
const chalk = require("chalk");
const server = net.createServer(function (socket) {
  socket.write(chalk.green("Welcome to my own massager\r\n"));
  memory.forEach((user) => {
    `${user.name}: ${user.massage}\n`;
  });

  socket.on("close", () => {
    let clientIndex = clients.indexOf(socket);
    clients.splice(clientIndex, 1);
    console.log("Closed", port);
  });

  socket.write(`let's meet.What is your name:`);
  let port = socket.remotePort;
  console.log("Client IP Port: ", socket.remoteAddress);
  console.log("Client conected. Port: ", port);
  let name = null;

  clients.push(socket);

  socket.on("data", (massage) => {
    massage = massage.toString().trim();
    if (name === null) {
      name = massage;
    } else {
      memory.push({ name, massage });
      clients.forEach((client) => {
        if (client !== socket) {
          client.write(name + ":" + massage + "\n");
          console.log(memory);
        }
      });
    }
  });

  socket.pipe(process.stdout);
});

server.listen(1337, "127.0.0.1", () => {
  console.log("Listening on", server.address());
});
