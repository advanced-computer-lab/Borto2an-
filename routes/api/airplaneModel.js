// routes
const express = require("express");
const airplaneModel_router = express.Router();
const AirplaneModel = require("../../models/AirplaneModel");
const authenticate = require("./Authentication");

airplaneModel_router.get("/", authenticate , function (req, res, next) {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  const queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  const regex = /\b(gt|gte|lt|lte|in)\b/g;
  queryStr = queryStr.replace(regex, "$$" + "$1");
  AirplaneModel.find(JSON.parse(queryStr))
    .then((airplaneModels) => res.json(airplaneModels))
    .catch((err) => res.status(404).json({ msg: "No models are found" }));
});

airplaneModel_router.get("/showAllModels",authenticate, (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  AirplaneModel.find()
    .then((model) => {
      res.json(model);
    })
    .catch((err) => res.status(404).json({ msg: "No models are found" }));
});

airplaneModel_router.put("/", authenticate , (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  const id = req.body._id;
  const update = req.body.update;
  AirplaneModel.findByIdAndUpdate(id,update)
  .then(() => {
    res.send("done");
  })
  .catch(err => res.status(400).send(err));
});


airplaneModel_router.delete("/:id",authenticate ,  async (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  try {
    const airplaneModel = await AirplaneModel.findByIdAndDelete(req.params.id);
    const Flight = require("../../models/Flight");
    await Flight.deleteMany({airplaneModelID:airplaneModel._id});
    if (airplaneModel) res.send(airplaneModel);
    else
      res.status(404).json({ msg: `No AirplaneModel with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});

airplaneModel_router.post("/",authenticate , async (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  AirplaneModel.create(req.body)
  .then(result => {res.send(result);})
  .catch(err => {res.status(400).send(err)});
});

module.exports = airplaneModel_router;
