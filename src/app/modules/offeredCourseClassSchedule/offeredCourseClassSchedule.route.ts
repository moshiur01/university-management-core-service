import express from 'express';
import { offeredCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.get('/', offeredCourseClassScheduleController.getAllFromDB);
router.get('/:id', offeredCourseClassScheduleController.getSingleFromDB);
router.post('/', offeredCourseClassScheduleController.insertIntoDb);
export const offeredCourseClassScheduleRoutes = router;
