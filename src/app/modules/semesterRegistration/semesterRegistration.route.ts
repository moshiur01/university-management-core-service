import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
const router = express.Router();

export const SemesterRegistrationRoute = router;

router.post(
  '/',
  validateRequest(semesterRegistrationValidation.create),
  semesterRegistrationController.insertIntoDB
);

router.get('/', semesterRegistrationController.getAllFromDB);
router.get('/:id', semesterRegistrationController.getDataById);

router.get('/:id', semesterRegistrationController.deleteFromDB);
