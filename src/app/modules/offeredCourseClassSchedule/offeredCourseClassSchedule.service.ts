/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourseClassSchedule, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  offeredCourseClassScheduleRelationalFields,
  offeredCourseClassScheduleRelationalFieldsMapper,
  offeredCourseClassScheduleSearchableFields,
} from './offeredCourseClassSchedule.constrains';
import { IOfferedCourseClassScheduleFilterRequest } from './offeredCourseClassSchedule.interface';
import { offeredCourseClassScheduleUtils } from './offeredCourseClassSchedule.utils';

const insertIntoDb = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await offeredCourseClassScheduleUtils.checkFacultyAvailable(data);
  await offeredCourseClassScheduleUtils.checkRoomAvailable(data);

  // existing : 12.30 - 13.30
  //new slot : 12.50 -13.50

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      semesterREegistration: true,
      offeredCourseSection: true,
      room: true,
      faculty: true,
    },
  });

  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseClassScheduleFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseClassScheduleSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseClassScheduleRelationalFields.includes(key)) {
          return {
            [offeredCourseClassScheduleRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseClassSchedule.findMany({
    include: {
      semesterREegistration: true,
      faculty: true,
      room: true,
      offeredCourseSection: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.offeredCourseClassSchedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleFromDB = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.findUnique({
    where: {
      id,
    },
    include: {
      faculty: true,
      offeredCourseSection: true,
      room: true,
      semesterREegistration: true,
    },
  });
  return result;
};

export const offeredCourseClassScheduleService = {
  insertIntoDb,
  getAllFromDB,
  getSingleFromDB,
};
