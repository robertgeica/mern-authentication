import { Router } from 'express';

import {
  createUser,
  confirmEmail,
} from '../controllers/user';

const router: Router = Router();

router.route('/api/v1/users').post(createUser);

router.route('/api/v1/users/confirm-email/:token').put(confirmEmail);

export default router;
