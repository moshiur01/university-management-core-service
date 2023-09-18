import express from 'express';
import { offeredCourseSectionController } from './offeredCouseSection.controller';

const router = express.Router();

router.post('/', offeredCourseSectionController.insertIntoDb);
export const offeredCourseSectionRoutes = router;
