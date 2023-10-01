const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");

const authRoutes = require("./routes/auth");
const profilesRoutes = require("./routes/profiles");
const blackListRoutes = require("./routes/blacklist");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));
app.use(fileUpload());

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/blacklist", blackListRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

const main = async () => {
    try {
        await mongoose.connect(config.DB_URL);
        console.log("DB OK");
        app.listen(config.PORT, () => {
            console.log("SERVER OK");
        });
    } catch (err) {
        console.log(err);
    }
}

main();