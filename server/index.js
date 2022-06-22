const path = require('path');
const express = require("express");

require('dotenv').config();
//to launch the server

const connection = require("./conf");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { sendStatus } = require("express/lib/response");

const port = process.env.PORT || 5000;
//These are the middlewares
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//This piece of code allows the Node and React app to be deployed on the same domain.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//establish the connection to the MySQL db with credentials from config.js
connection.connect((err) => {
  if(err) {
      console.error(`ERROR!!! :/ Connection to the db did not work, ERROR: ${err}`);
      return;
  }
  console.log('Great! DB connection working');
});

app.get("/check", (req, res) => {
  connection.query("SELECT * FROM users", function (err, result) {
    if (err) {
      res.status(500).send("I wrote this.....")
    } else {
      res.send.json({result});
    }
  });
});

// path to register a user -> /register
app.post("/register", (req, res) => {
//we will recieve the user info from the frontend/postman

//Takes two parameters, 1st the password and the level of secure, the higher the level the longer it will take.
bcrypt
  .hash(req.body.password, 10)
  .then((hashedPassword) => {
    let newUser = {
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        city: req.body.city,
        age: req.body.age,
  };
  //connect to the DB with .query() method to insert this info into our users table
  // we will recieve some user info
  // we will connect to the DB and store this infor
  connection.query('INSERT INTO users SET ?', newUser, (err) => {
    if(err) {
      res
      .status(500)
      .send('Server error, could not register the new user into the DB');
    } else {
      res.status(201).send("Success registering the user!");
    }
  }); 
})
.catch((hashError) => 
  console.error(`There was an error encrypting the password. Error: ${hashError}`
  )
);
  // if it worked, we will send a status code of success top the end user 
  // to it did not wokr, we eill send a status code of failure
});

// Path to Login into the app
app.post("/log", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  // query in the BD to check email and pass
  connection.query(
    "SELECT * FROM users WHERE email=?", user.email,
    (err, results) => {
      if (err) {
        res.status(500).send("Email not found");
      } else {
        bcrypt
          .compare(user.password, results[0].password)
          .then((isAMatch) => {
            if (isAMatch) {
//Put in the JWT 
          const generatedToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET
          );
              res.status(200).json({
                message: "Successfully logged in!",
                token: generatedToken,
                loggedIn: true,
                name: results[0].name,
                city: results[0].city,
                age: results[0].age,
              });
            } else {
              res.status(500).send("Wrong password");
            }
          })
          .catch((passwordError) => 
          console.error("Error trying to decrypt the password")
          );
        }
      }
  );
});

//The middle ware used to authenticate the user
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  //check if the user has a token
  if (token === undefined) return res.sendStatus(401);
  //check that it is a valid token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // finally if theres no errors we go to the next middleware
    req.foundUser = user;
    next();
  }); 
};

app.get('/profile', authenticateUser, (req, res) => {
// here we have access to what we did on the req object in the middleware
connection.query(
  'SELECT email, name, city, age FROM users WHERE email = ?', req.foundUser.email, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result[0]);
    }
  }
);
});

//Error is a datatype
app.listen(port, (err) => {
  if(err) {
    throw new Error('Sorry :/ Looks like something is not     working as expected!'
    );
  }
  console.log(`Great Success! Your server is runnning at port: ${port}`);
});