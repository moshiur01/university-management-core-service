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
router.post(
  '/assign-faculties/:id',
  validateRequest(CourseValidation.assignOrRemoveCourses),
  courseController.assignFaculties
);
router.patch(
  '/:id',
  validateRequest(CourseValidation.update),
  courseController.updateOneInDB
);

router.delete('/:id', courseController.deleteByIdFromDB);

router.delete(
  '/remove-faculties/:id',
  validateRequest(CourseValidation.assignOrRemoveCourses),
  courseController.deleteFaculties
);
export const courseRoutes = router;
