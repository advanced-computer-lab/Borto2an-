const express = require("express"); 
const User = require("./../../models/User");
const jwt = require('jsonwebtoken');
const user_Router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session') ;

const isValidEmail = (v) => {
  //checks if email has @ and . after @
  if (!v.includes("@")) return false;
  let arr = v.split("@");
  if (!arr[1].includes(".")) return false;
  return true;
};

function isValidEntry(entry) {
  //check for all required data
  if (
    !entry.firstName ||
    !entry.lastName ||
    !entry.email ||
    !entry.password ||
    !isValidEmail(entry.email) ||
    !entry.passportNumber
  )
    return false;
  return true;
}
function isValidUpdate(entry) {
  //check for all required data
  if (
    ("firstName" in entry && !entry.firstName) ||
    ("lastName" in entry && !entry.lastName) ||
    ("email" in entry && !entry.email) ||
    ("password" in entry && !entry.password) ||
    ("passportNumber" in entry && !entry.passportNumber) ||
    ("email" in entry && !isValidEmail(entry.email))
  )
    return false;
  return true;
}

user_Router.get("/:id", (req, res) => {
  //authentication for requester here
  //
  User.findById(req.params.id)
    .then((e) => res.send(e))
    .catch((err) => {
      res.status(500).send("not a correct id");
      console.log(err);
    });
});

user_Router.get("/", (req, res) => {
  //authentication for requester here
  //
  User.find().then((e) => res.send(e));
});

//create
user_Router.post("/register", async(req, res) => {
  if (isValidEntry(req.body)) {
  let entry = req.body; 
    const user = User(entry);
    user
      .save()
      .then(() => {
        res.send("added");
      })
      .catch((err) => {
        if (err) {
              console.error(err);
          res.status(500).send("Database error " + err);
        }
      });
  } else {
    res.sendStatus(402);
  }
});

user_Router.post("/login", async(req, res) => {
  console.log(req.body);
  const {email,password} = req.body;
  const user = await User.find({email:email});
  if(user[0]){
    console.log(user);
    const compare = (user[0].password===password) ; 
    if(compare){
      const id = user.id ; 
      const token = jwt.sign({id},"jwtsecret",{
        expiresIn:300,
      })
           res.status(200).json({auth:true , token:token,user});
    }
    else{
      res.send({message:"Wrong Password !"});
    }

  }
  else{
    res.send({message:"User not found"});
  }

});

//update
user_Router.put("/", (req, res) => {
  const id = req.body._id;
  const update = req.body.update;
  if (!id || !isValidUpdate(update)) res.sendStatus(422);
  User.findByIdAndUpdate(id, update)
    .then(() => {
      console.log("done");
      res.send("done");
    })
    .catch((err) => res.status(400).send(err));
});

user_Router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      const Reservation = require("../../models/Reservation");
      await Reservation.deleteMany({userId:user._id});
      res.send(user);
    }
    else
      res.status(404).json({ msg: `No user with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});

module.exports = user_Router;
