require("express-error-handler")
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");

const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");

const config = require("./utils/config");
const {log, error} = require("./utils/logger")

const blogRouter = require("./controllers/blogRouter");

mongoose.connect(config.MONGODB_URL)
.then(() => { log("connected to MongoDB") })
.catch((err) => { error("error connecting to MongoDB", err.message) });

const app = express()

app.use(cors);
app.use(express.json())
app.use(logger)

app.use('/api/blogs', blogRouter)

app.use(notFound)

module.exports = app

