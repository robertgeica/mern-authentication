import { Router } from 'express';
import fileUpload from 'express-fileupload';

import {
  createUser,
  confirmEmail,
  requestEmailConfirmation,
  loginUser,
  getLoggedUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  requestPasswordReset,
  confirmPasswordReset,
  uploadUserImage,
  requestEmailChange,
  confirmEmailChange,
  requestPhoneNumberConfirmation,
  confirmPhoneNumber,
} from '../controllers/user';
import { authorize, protect } from '../middleware/authMiddleware';
import {
  allowMultiple,
  fileExtensionLimiter,
  filesExists,
  fileSizeLimiter,
} from '../middleware/imageUpload';
import { advanceQuery } from '../middleware/advanceQuery';
import User from '../models/User';

const router: Router = Router();

router
  .route('/api/v1/users')
  .get(protect, authorize(['admin']), advanceQuery(User), getUsers)
  .post(createUser);

router.route('/api/v1/users/login').post(loginUser);

router.route('/api/v1/users/logged-user').get(protect, getLoggedUser);
router
  .route('/api/v1/users/:id')
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);
// router.route('/api/v1/users');

router.route('/api/v1/users/confirm-email').post(requestEmailConfirmation);
router.route('/api/v1/users/confirm-email/:token').put(confirmEmail);

router
  .route('/api/v1/users/confirm-phone')
  .post(protect, requestPhoneNumberConfirmation);
router
  .route('/api/v1/users/confirm-phone/:token')
  .put(protect, confirmPhoneNumber);

router.route('/api/v1/users/reset-password').post(requestPasswordReset);
router.route('/api/v1/users/reset-password/:token').put(confirmPasswordReset);

router.route('/api/v1/users/change-email').post(protect, requestEmailChange);
router.route('/api/v1/users/change-email/:token').post(confirmEmailChange);

router
  .route('/api/v1/users/image-upload')
  .patch(
    protect,
    fileUpload({ createParentPath: true }),
    filesExists,
    fileSizeLimiter,
    fileExtensionLimiter(['.jpg', '.jpeg', '.png']),
    allowMultiple(false),
    uploadUserImage
  );

export default router;
