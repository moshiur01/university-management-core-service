import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { buildingController } from './building.controller';
import { buildingValidation } from './building.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(buildingValidation.create),
  buildingController.insertIntoDB
);
router.get('/', buildingController.getAllFromDB);
router.get('/:id', buildingController.getDataById);

router.patch(
  '/:id',
  validateRequest(buildingValidation.update),
  buildingController.updateIntoDB
);

router.delete('/:id', buildingController.deleteFromDB);

export const buildingRoutes = router;
