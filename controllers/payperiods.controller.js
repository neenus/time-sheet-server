const Payperiod = require('../models/Payperiod.model');

// Get all payperiods
module.exports.getPayperiods = async (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  // find payperiods that have a start date of less than or equal to today's date plus 5 days
  const payperiods = await Payperiod.find({ start_date: { $lte: today } });
  if (!payperiods) {
    return res.status(404).send('No payperiods found');
  }

  // sort payperiods by period_num
  const sortedPayperiods = payperiods.sort((a, b) => a.period_num - b.period_num);

  res.status(200).send(sortedPayperiods);
}

module.exports.createPayperiod = async (req, res, next) => {
  // create papyeriod will be called by the payperiod scheduler cron job every Sunday at midnight UTC
  // query database for payperiods to check the latest payperiod
  // if the latest payperiod is not the current payperiod, create a new payperiod
  // if the latest payperiod is the current payperiod, do nothing
  // if there are no payperiods, create a new payperiod starting with a biweekly payperiod that starts December 25, 2022 and ends January 7, 2023

  const payperiods = await Payperiod.find();

  if (!payperiods.length) {
    const newPayperiod = new Payperiod({
      period_num: 1,
      start_date: new Date(2022, 11, 25),
      end_date: new Date(2023, 0, 7),
    })

    await newPayperiod.save();

  } else {

    // sort payperiods foudn in database by period_num
    payperiods.sort((a, b) => a.period_num - b.period_num);

    const today = new Date();
    const latestPayperiod = payperiods[payperiods.length - 1];
    const latestPayperiodEnd = latestPayperiod.end_date;
    let latestPayperiodNum = latestPayperiod.period_num;

    // new payperiod starts the day after the latest payperiod ends
    // payperiod number is the latest payperiod number + 1 up to 26 payperiods per year (biweekly)
    while (today > latestPayperiodEnd) {
      let newPayperiodStart = new Date(latestPayperiodEnd.setDate(latestPayperiodEnd.getDate() + 1));
      let newPayperiodEnd = new Date(latestPayperiodEnd.setDate(latestPayperiodEnd.getDate() + 13));
      let newPayperiodNum = latestPayperiodNum + 1;

      const newPayperiod = new Payperiod({
        period_num: newPayperiodNum,
        start_date: newPayperiodStart,
        end_date: newPayperiodEnd,
      });

      await newPayperiod.save();

      if (latestPayperiodNum <= 26) {
        latestPayperiodNum++;
      } else {
        latestPayperiodNum = 1;
      }
    }
  }
}