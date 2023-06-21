const mongoose = require('mongoose');

const payperiodSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  payperiods: [
    {
      periodNum: {
        type: Number,
        required: true,
      },
      periodStart: {
        type: Date,
        required: true,
      },
      periodEnd: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Payperiod', payperiodSchema);
