import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offererCourses.controller';
import { offeredCourseValidation } from './offererCourses.validation';

const router = express.Router();
router.get('/', OfferedCourseController.getAllFromDB);
router.get('/:id', OfferedCourseController.getByIdFromDB);

router.post(
  '/',
  validateRequest(offeredCourseValidation.create),
  OfferedCourseController.insertIntoDb
);

router.patch(
  '/:id',
  validateRequest(offeredCourseValidation.update),

  OfferedCourseController.updateOneInDB
);

router.delete(
  '/:id',

  OfferedCourseController.deleteByIdFromDB
);

export const OfferedCourseRoutes = router;
