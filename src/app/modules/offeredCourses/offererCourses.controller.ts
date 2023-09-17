import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseService } from './offererCourses.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Created',
    data: result,
  });
});

export const OfferedCourseController = {
  insertIntoDb,
};
