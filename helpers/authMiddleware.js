export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

export const ensureLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  return next();
};
