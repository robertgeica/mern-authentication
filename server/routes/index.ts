import { Router } from 'express';
import fileUpload from 'express-fileupload';

import {
  createUser,
  confirmEmail,
  sendEmailConfirmation,
  loginUser,
  getLoggedUser,
  getUser,
  deleteUser,
  updateUser,
  requestPasswordReset,
  confirmPasswordReset,
  uploadUserImage,
  requestEmailChange,
  confirmEmailChange,
} from '../controllers/user';
import protect from '../middleware/authMiddleware';
import {
  allowMultiple,
  fileExtensionLimiter,
  filesExists,
  fileSizeLimiter,
} from '../middleware/imageUpload';

const router: Router = Router();

router.route('/api/v1/users').post(createUser);
router.route('/api/v1/users/login').post(loginUser);

router.route('/api/v1/users/logged-user').get(protect, getLoggedUser);
router.route('/api/v1/users/:id').get(protect, getUser);
router
  .route('/api/v1/users')
  .delete(protect, deleteUser)
  .patch(protect, updateUser);

router.route('/api/v1/users/confirm-email/:token').put(confirmEmail);
router.route('/api/v1/users/confirm-email').post(sendEmailConfirmation);
router.route('/api/v1/users/reset-password').post(requestPasswordReset);
router.route('/api/v1/users/reset-password/:token').put(confirmPasswordReset);
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

  router.route('/api/v1/users/change-email').post(protect, requestEmailChange);
  router.route('/api/v1/users/change-email/:token').post(confirmEmailChange);




export default router;
