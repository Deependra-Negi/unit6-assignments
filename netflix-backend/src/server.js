const express = require('express');
const connect = require("./config/db");

const app = express();
app.use(express.json());

const { register, login } = require("./controllers/auth.controller");
const movieController = require("./controllers/movie.controller");
const musicController = require("./controllers/music.controller");
const seriesController = require("./controllers/series.controller");
const userController = require("./controllers/user.controller");

app.post("/register", register);
app.post("/login", login);

app.use("/movies", movieController);
app.use("/series", seriesController);
app.use("/music", musicController);
app.use("/users", userController);


const port = 3001;
app.listen(port, async function () {
    await connect();
    console.log(`Listening on port ${port}`);
});

