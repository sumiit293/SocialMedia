const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const passport = require("passport");
const server = require('http').createServer(app);
require("dotenv").config();

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const cors = require("cors");

// cors moddle ware
app.use(cors())

const iosec = io.of("/active_or_not");
var secsocket;

iosec.on("connection", (socket) => {
    secsocket = socket;
    socket.on("join_room", (value) => {
        socket.join(value.room_id);
        const noOfPeople = iosec.adapter.rooms.get(value.room_id).size;
        if (noOfPeople > 1) {
            iosec.to(value.room_id).emit(value.room_id + "set_active");
        }
    })
    socket.on("leave_room", (value) => {
        socket.leave(value.room_id);
        console.log("Left to the room", value.room_id)
        iosec.to(value.room_id).emit(value.room_id + "set_inactive");
    })

})

io.on('connection', (socket) => {
    socket.on('chat-msg', (msg) => {
        const noOfPeople = iosec.adapter.rooms.get(msg.room_id).size;
        if (noOfPeople > 1) {
            iosec.to(msg.room_id).emit(msg.room_id + "set_active");
            socket.to(msg.room_id).emit("incoming_chat_msg", msg.content);
            secsocket.to(msg.room_id).emit(msg.room_id + "increase_msg_counter", Date.now());
        }

    });
    socket.on("join_room", (value) => {
        socket.join(value);
    })
    socket.on("leave_room", (value) => {
        socket.leave(value);
    })

});

// init middleware
app.use(express.json({ extended: false }));

// conect to database
const connectToDB = require("./config/Connectdb");
const db = require('./config/Myurl').host;
connectToDB(db);

//initialize the passport middleware
app.use(passport.initialize());

// config for JWT strategy
require("./config/JwtStrategy")(passport);

//bringing auth routes
const auth = require("./routes/api/auth");
app.use("/api", auth);

//bringing post route 
const post = require("./routes/api/post");
app.use("/api", post);

//bringing the comment route
const comment = require("./routes/api/comment");
app.use("/api", comment);

//bringing the profilr routes
const profile = require("./routes/api/profile")
app.use("/api", profile)

//bringing the routest for friendship management
const friend = require("./routes/api/friends");
app.use("/api", friend);

//bringing the test routes
const test = require("./routes/api/test");
app.use("/api", test);

//bringing the message routes
const message = require("./routes/api/message");
app.use("/api", message)

server.listen(PORT, () => console.log("app is running on port  " + PORT));

