import express from 'express';
import { buildingController } from './building.controller';

const router = express.Router();

router.post('/', buildingController.insertIntoDB);
router.get('/', buildingController.getAllFromDB);

export const buildingRoutes = router;
