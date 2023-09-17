import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offererCourses.controller';
import { offeredCourseValidation } from './offererCourses.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(offeredCourseValidation.create),
  OfferedCourseController.insertIntoDb
);

export const OfferedCourseRoutes = router;
