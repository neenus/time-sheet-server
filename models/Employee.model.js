const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  },
  phone: {
    type: String
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  sin: {
    type: Number,
    required: [true, 'SIN is required'],
    validate: {
      validator: function (v) {
        return /\d{9}/.test(v);
      },
      message: props => `${props.value} is not a valid SIN number!`
    },
    min: [100000000, 'SIN is too short'],
    max: [999999999, 'SIN is too long'],
    unique: true
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  hire_date: {
    type: Date,
    required: [true, 'Hire date is required']
  },
  position: {
    type: String,
  },
  pay_frequency: {
    type: Number,
    required: [true, 'Pay frequency is required'],
    validate: {
      validator: function (v) {
        return [7, 14, 15, 30].includes(v);
      },
      message: props => `${props.value} is not a valid pay frequency!`
    },
    enum: [7, 14, 15, 30]
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Employee', employeeSchema);