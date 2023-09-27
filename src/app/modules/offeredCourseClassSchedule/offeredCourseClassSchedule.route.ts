import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseClassScheduleController } from './offeredCourseClassSchedule.controller';
import { OfferedCourseClassScheduleValidation } from './offererCourseClassSchedule.validation';

const router = express.Router();

router.get('/', offeredCourseClassScheduleController.getAllFromDB);
router.get('/:id', offeredCourseClassScheduleController.getSingleFromDB);
router.post('/', offeredCourseClassScheduleController.insertIntoDb);
router.patch(
  '/:id',
  validateRequest(OfferedCourseClassScheduleValidation.update),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offeredCourseClassScheduleController.updateOneInDB
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offeredCourseClassScheduleController.deleteByIdFromDB
);
export const offeredCourseClassScheduleRoutes = router;
