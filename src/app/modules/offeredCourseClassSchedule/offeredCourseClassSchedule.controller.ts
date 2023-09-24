import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleFilterableFields } from './offeredCourseClassSchedule.constrains';
import { offeredCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseClassScheduleService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Class Schedule Created',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, offeredCourseClassScheduleFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await offeredCourseClassScheduleService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Class Schedule fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const offeredCourseClassScheduleController = {
  insertIntoDb,
  getAllFromDB,
};
