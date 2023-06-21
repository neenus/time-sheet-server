const Payperiod = require('../models/Payperiod.model');

// Get all payperiods
module.exports.getPayperiods = async (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const payperiods = await Payperiod.find({ year: currentYear });
  if (!payperiods) {
    return res.status(404).send('No payperiods found');
  }

  res.status(200).send(payperiods[0].payperiods);
}