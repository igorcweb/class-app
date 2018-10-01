import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/login');
  req.session.destroy();
});

export default router;
