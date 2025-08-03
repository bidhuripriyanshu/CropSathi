const { connectDB } = require("./config/db"); //connectDB is a function that connects to the database
const express = require("express"); //express is a framework for building web applications
const cors = require("cors"); //cors is a middleware that allows cross-origin requests
require("dotenv").config(); //dotenv is a module that loads environment variables from a .env file into process.env
const cookieParser = require("cookie-parser"); //cookieParser is a middleware that parses cookies
const authRoute = require("./Routes/AuthRoute"); //authRoute is a route that handles authentication
const dataRoute = require("./Routes/DataRoute"); //dataRoute is a route that handles data
const cropRoute = require("./Routes/CropRoute"); //cropRoute is a route that handles crops
const postRoute = require("./Routes/PostRoute"); //postRoute is a route that handles posts
const commentRoute = require("./Routes/CommentRoute"); //commentRoute is a route that handles comments
const { PORT } = process.env; //PORT is the port number that the server will listen on


const app = express(); //create an express application

connectDB(); //connect to the database
console.log();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    //CORS (Cross origin resource sharing): You can allow requests from other domains to access the resources on your server by using the cors() express middleware function. 
    origin: ["http://localhost:4000", "https://farm-stack-ai.vercel.app/", "https://cropmate.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());  
//express.json(): The express.json() will add a body property to the request or req object. This includes the request body's parsed JSON data. req.body in your route handler function will allow you to access this data

app.use("/", authRoute);
app.use("/", dataRoute);
app.use("/", cropRoute);
app.use("/", postRoute);
app.use("/", commentRoute);


// Adding by priyanshu
app.get("/", (req, res) => {
  res.send("Hello World");
}); 