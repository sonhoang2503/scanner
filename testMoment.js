const moment = require('moment');

const current = moment().valueOf();

console.log(current);

const start = moment(current).startOf('day').toDate();
const end = moment(current).endOf('day').toDate();

console.log(start, end);
