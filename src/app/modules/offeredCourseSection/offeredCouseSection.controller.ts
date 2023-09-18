import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseSectionFilterableFields } from './OfferedCourseSection.constrain';
import { offeredCourseSectionService } from './offeredCouseSection.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseSectionService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Section create successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, offeredCourseSectionFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await offeredCourseSectionService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Sections fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await offeredCourseSectionService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Section fetched successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await offeredCourseSectionService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Section updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await offeredCourseSectionService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Section deleted successfully',
    data: result,
  });
});

export const offeredCourseSectionController = {
  insertIntoDb,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
