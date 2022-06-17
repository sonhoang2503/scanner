const express = require('express');
const router = express.Router();
// const { errorSites } = require('../controllers/status.controller');

const { validateData } = require('../middlewares/validateData');
const {
  checkURLs,
  getErrorUrlsUpdate,
  getErrorUrlsToday,
} = require('../controllers/check.controller');
const {
  renderDayReview,
  renderHome,
  renderUpdate,
} = require('../controllers/view.controller');

const { login, protect } = require('../controllers/auth.controller');

// const { testCtrl } = require('../controllers/test.controller');
// const { uploadFile } = require('../helpers/multer');

// router.route('/test-speed').get(testCtrl);

// check
router.route('/today').get(getErrorUrlsToday);
router.route('/check').post(validateData, checkURLs);

// view
router.route('/update').get(protect, renderUpdate);
router.route('/day-review').get(protect, renderDayReview);
router.route('/').get(renderHome);

// auth
router.route('/login').post(login);

module.exports = router;
