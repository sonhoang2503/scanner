const User = require('../models/user');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new Error('Invalid email or password'));
    }

    res.cookie('user', user.id, {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure,
    });

    res.status(200).json({ msg: 'Login success' });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  const token = req.cookies.user;

  if (!token) {
    // return next(
    //   new Error('You are not logged in! Please log in to get access')
    // );
    res.redirect('/');
  }

  const currentUser = User.findById(token);

  if (!currentUser) {
    return next(new Error('Invalid token! Please re-login to get access'));
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

// exports.protect = catchAsync(async (req, res, next) => {
//   // 1) Getting token and check of it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     return next(
//       new AppError('You are not logged in! Please log in to get access.', 401)
//     );
//   }

//   // 2) Verification token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError(
//         'The user belonging to this token does no longer exist.',
//         401
//       )
//     );
//   }

//   // 4) Check if user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError('User recently changed password! Please log in again.', 401)
//     );
//   }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   res.locals.user = currentUser;
//   next();
// });
