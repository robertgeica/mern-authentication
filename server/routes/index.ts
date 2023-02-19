import { Router } from 'express';

import { createUser } from '../controllers/user';

const router: Router = Router();

router.route('/api/v1/users').post(createUser);

export default router;
