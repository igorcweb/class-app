function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function ensureLoggedOut(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  return next();
}

module.exports = { ensureAuthenticated, ensureLoggedOut };
