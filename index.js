import { Server } from "socket.io";

// const io = new Server(9000, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });
const io = new Server(9000);

let User = [];

const adduser = (userdata, socketId) => {
  !User.some((user) => user.sub == userdata.sub) &&
    User.push({ ...userdata, socketId });
};

// getUser
const getUser = (userId) => {
  console.log("working", userId);
  return User.find((user) => user.sub === userId);
};

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("addUsers", (userdata) => {
    adduser(userdata, socket.id);
    io.emit("getUsers", User);
  });

  socket.on("sendMessage", (data) => {
    const user = getUser(data.reciverId);
    // io.to(User.socketId).emit('getMessage', data)
    io.emit("getMessage", data);
  });
});
