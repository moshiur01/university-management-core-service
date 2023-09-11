import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validations';

const router = express.Router();

router.get('/', FacultyController.getAllFromDB);

router.get('/:id', FacultyController.getByIdFromDB);

router.post(
  '/',
  validateRequest(FacultyValidation.create),
  FacultyController.insertIntoDB
);

router.post(
  '/assign-courses/:id',
  validateRequest(FacultyValidation.assignOrRemoveCourses),
  FacultyController.assignCourses
);

router.delete(
  '/remove-courses/:id',
  validateRequest(FacultyValidation.assignOrRemoveCourses),
  FacultyController.deleteCourses
);

export const facultyRoutes = router;
