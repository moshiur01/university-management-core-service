import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterAbleFields } from './building.constrains';
import { buildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});

//*get all Building

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await buildingService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Fetched successfully',
    data: result?.data,
    meta: result?.meta,
  });
});

//*get single building
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Building data fetched!!',
    data: result,
  });
});

//*update into db
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req?.params;
  const payload = req?.body;
  const result = await buildingService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building title updated successfully',
    data: result,
  });
});

//delete from db
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await buildingService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Deleted successfully',
    data: result,
  });
});
export const buildingController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
