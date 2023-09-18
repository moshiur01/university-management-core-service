import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IOfferedCourse } from './offererCourseSection.interface';

const insertIntoDb = async (
  data: IOfferedCourse
): Promise<OfferedCourseSection> => {
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offerer Course dose not exits');
  }

  data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;
  const result = await prisma.offeredCourseSection.create({
    data,
    include: {
      offerredCourse: true,
      semesterRegistration: true,
    },
  });

  return result;
};

export const offeredCourseSectionService = {
  insertIntoDb,
};
