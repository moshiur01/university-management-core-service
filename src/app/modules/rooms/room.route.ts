import express from 'express';
import { roomController } from './room.controller';

const router = express.Router();

router.post('/', roomController.insertIntoDB);

export const roomRoutes = router;
