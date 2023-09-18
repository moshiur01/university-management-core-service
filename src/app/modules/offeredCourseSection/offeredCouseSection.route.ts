import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseSectionValidation } from './offeredCourseSection.validation';
import { offeredCourseSectionController } from './offeredCouseSection.controller';

const router = express.Router();
router.get('/', offeredCourseSectionController.getAllFromDB);

router.get('/:id', offeredCourseSectionController.getByIdFromDB);

router.post(
  '/',
  validateRequest(OfferedCourseSectionValidation.create),

  offeredCourseSectionController.insertIntoDb
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseSectionValidation.update),
  offeredCourseSectionController.updateOneInDB
);

router.delete('/:id', offeredCourseSectionController.deleteByIdFromDB);
export const offeredCourseSectionRoutes = router;
