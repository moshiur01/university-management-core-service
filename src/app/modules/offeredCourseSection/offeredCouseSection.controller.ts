import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const offeredCourseSectionController = {
  insertIntoDb,
};
