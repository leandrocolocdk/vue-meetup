const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");

// const session = require("express-session");
// const passport = require("passport");

// Only for session Authentication Passport
// const MongoDBStore = require("connect-mongodb-session")(session);

// const store = new MongoDBStore({
//   url: config.DB_URI,
//   collection: "meetuperSessions"
// });

require("./models/meetups");
require("./models/users");
require("./models/threads");
require("./models/posts");
require("./models/categories");

require("./services/passport");

const meetupsRoutes = require("./routes/meetups"),
  usersRoutes = require("./routes/users"),
  threadsRoutes = require("./routes/threads"),
  postsRoutes = require("./routes/posts"),
  categoriesRoutes = require("./routes/categories");

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());

// //// Only for session Authentication Passport
// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: config.SESSION_SECRET,
//     cookie: { maxAge: 3600000 },
//     store
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/v1/meetups", meetupsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/threads", threadsRoutes);
app.use("/api/v1/categories", categoriesRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("App is running on port: " + PORT);
});
