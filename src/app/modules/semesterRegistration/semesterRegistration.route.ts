import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
const router = express.Router();

export const SemesterRegistrationRoute = router;

router.get('/', semesterRegistrationController.getAllFromDB);
router.get('/:id', semesterRegistrationController.getDataById);

router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.startMyRegistration
);
router.post(
  '/',
  validateRequest(semesterRegistrationValidation.create),
  semesterRegistrationController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(semesterRegistrationValidation.update),
  semesterRegistrationController.updateOneInDB
);

router.delete('/:id', semesterRegistrationController.deleteFromDB);
