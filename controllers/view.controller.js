const UrlService = require('../services/url.services');

exports.renderDayReview = async (req, res, next) => {
  try {
    let number;
    if (req.query.time) {
      const { time } = req.query;
      number = parseInt(time);
    } else {
      let today = new Date();
      number = today.getTime();
    }

    const errors = await UrlService.getErrorUrlsDay(number);
    // console.log(errors);
    res.status(200).render('day-review', {
      title: 'Day review',
      errors,
      number,
    });
    // res.status(200).json({ msg: 'hello' });
  } catch (err) {
    throw err;
  }
};

exports.renderHome = async (req, res, next) => {
  try {
    res.status(200).render('home');
  } catch (err) {
    throw err;
  }
};

exports.renderUpdate = async (req, res, next) => {
  try {
    // const { time } = req.query;
    // const number = parseInt(time);
    const day = new Date();
    const number = day.getTime();
    console.log(number);
    const errors = await UrlService.getErrorUrlsUpdate(number);

    res.status(200).render('errors-update', {
      title: 'Update errors',
      errors,
      number,
    });
  } catch (err) {
    throw err;
  }
};

exports.getErrorUrlsUpdate = async (req, res, next) => {
  try {
    const errors = await UrlService.getErrorUrlsUpdate();

    res.status(200).json(errors);
  } catch (err) {
    next(err);
  }
};
