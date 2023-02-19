import { Router } from 'express';

import {
  createUser,
  confirmEmail,
  sendEmailConfirmation,
} from '../controllers/user';

const router: Router = Router();

router.route('/api/v1/users').post(createUser);

router.route('/api/v1/users/confirm-email/:token').put(confirmEmail);
router.route('/api/v1/users/confirm-email').post(sendEmailConfirmation);


export default router;
