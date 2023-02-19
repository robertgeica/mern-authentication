import { Router } from 'express';

import {
  createUser,
  confirmEmail,
  sendEmailConfirmation,
  loginUser,
  getLoggedUser,
  getUser,
} from '../controllers/user';
import protect from '../middleware/authMiddleware';

const router: Router = Router();

router.route('/api/v1/users').post(createUser);
router.route('/api/v1/users/login').post(loginUser);

router.route('/api/v1/users/logged-user').get(protect, getLoggedUser);
router.route('/api/v1/users/:id').get(protect, getUser);

router.route('/api/v1/users/confirm-email/:token').put(confirmEmail);
router.route('/api/v1/users/confirm-email').post(sendEmailConfirmation);

export default router;
