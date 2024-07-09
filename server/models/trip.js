// server/models/Trip.js
const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fromCity: {
    type: String,
    required: true,
  },
  toCity: {
    type: String,
    required: true,
  },
  departDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  passengersAdults: {
    type: Number,
    required: true,
  },
  passengersChildren: {
    type: Number,
    default: 0,
  },
  passengersInfants: {
    type: Number,
    default: 0,
  },
  travelClass: {
    type: String,
    required: true,
  },
  airlineCode: {
    type: String,
  },
  flightDuration: {
    type: String,
  },
  price: {
    type: Schema.Types.Decimal128,
  },
  departTime: {
    type: String,
  },
  arrivalTime: {
    type: String,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;
