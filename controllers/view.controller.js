const UrlService = require('../services/url.services');

exports.renderErrorUpdate = async (req, res, next) => {
  try {
    const errors = await UrlService.getErrorUrlsUpdate();

    const current = new Date();
    const moment = current.toLocaleString();
    res.status(200).render('errors-update', {
      title: 'Update errors',
      errors,
      moment,
    });
  } catch (err) {
    throw err;
  }
};
