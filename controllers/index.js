import express from 'express';
const router = express.Router();
import { ensureAuthenticated } from '../helpers/authMiddleware';

router.get('/', ensureAuthenticated, (req, res) => {
  const { id, first_name, last_name, registeredIds } = req.user[0];
  res.render('index', {
    success: req.flash('success'),
    id,
    first_name,
    last_name,
    registeredIds
  });
});

export default router;
