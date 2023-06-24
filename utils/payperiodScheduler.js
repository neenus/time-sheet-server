const cron = require('node-cron');
const moment = require('moment');

const { createPayperiod } = require('../controllers/payperiods.controller');

// Run the createPayperiod function every Sunday at midnight
const payperiodScheduler = () => {
  console.log('Payperiod scheduler cron job started');
  // Cron syntax: minute, hour, day of month, month, day of week
  // Time is in UTC (GMT) timezone which is 4 hours ahead of EST (GMT-4) during daylight savings time and 5 hours ahead of EST (GMT-5) during standard time
  cron.schedule('0 0 * * 0', () => {
    console.log(`payperiod scheduler ran on ${moment().format('MMMM Do YYYY, hh:mm:ssA')} UTC`)
    createPayperiod()
  });
};

module.exports = payperiodScheduler; 