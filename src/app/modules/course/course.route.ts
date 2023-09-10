import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseController } from './course.controller';
import { CourseValidation } from './course.validation';
const router = express.Router();

router.get('/', courseController.getAllFromDB);
router.get('/:id', courseController.getByIdFromDB);

router.post(
  '/',
  validateRequest(CourseValidation.create),
  courseController.insertIntoDB
);

router.delete('/:id', courseController.deleteByIdFromDB);
export const courseRoutes = router;
