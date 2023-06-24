const mongoose = require('mongoose');

const payperiodSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  period_num: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  }
});

module.exports = mongoose.model('Payperiod', payperiodSchema);
