import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

export const SemesterRegistrationRoute = router;

router.post('/', semesterRegistrationController.insertIntoDB);
router.get('/', semesterRegistrationController.getAllFromDB);
