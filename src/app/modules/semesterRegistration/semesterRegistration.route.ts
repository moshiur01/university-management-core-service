import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
const router = express.Router();

router.get(
  '/get-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.getMyRegistration
);

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

router.post(
  '/enroll-into-course',
  validateRequest(semesterRegistrationValidation.enrollOrWithdrawCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.enrollIntoCourse
);

router.post(
  '/withdraw-from-course',
  validateRequest(semesterRegistrationValidation.enrollOrWithdrawCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.withdrawFromCourse
);

router.post(
  '/confirm-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.confirmMyRegistration
);

export const SemesterRegistrationRoute = router;
