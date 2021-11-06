// bare file to fill later with the schema of the db

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true
  },
  flightNumber: {
    type: Number,
    required: true,
  },
  flightDate: {
    type: Date,
    required: true
  },
  departureTime: {
    type: String,
    required: false
  },
  arrivalTime: {
    type: String,
    required: false
  },
  seatsAvailable: {
    type: Number,
    required: false
  },
  cabin: {
    type: String,
    required: false
  },
  totalSeats: {
    type: Number,
    required: false
  },
  airplaneType: {
    type: String,
    required: false
  },
  duration: {
      type : Number,
      required : false
  },
  airline: {
    type : String,
    required : true
},
hasTransit: {
    type : Boolean,
    required : true
},
}, { timestamps: true });

const Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;