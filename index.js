var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var SimpleCrypto = require("simple-crypto-js").default;
var _secretKey = "1234";
var simple1 = new SimpleCrypto(_secretKey)

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// app.use('/', require('express').static('css'));

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    mensajitoEncriptado = simple1.encrypt(msg);
    mensajitoDesencriptado = simple1.decrypt(mensajitoEncriptado);
    io.emit("chat message", mensajitoDesencriptado + "        ------>            " + mensajitoEncriptado);
    // io.emit("chat message", mensajitoDesencriptado);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
