/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { courseSearchableFields } from './course..constrain';
import { ICourseCreateData, ICourseFilterRequest } from './course.interface';

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    //*create new course
    const result = await transactionClient.course.create({
      data: courseData,
    });

    //*if data isn't created
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course!!');
    }

    //*create preRequisite for courses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        const createPrerequisite =
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: result?.id,
              preRequisiteId: preRequisiteCourses[index].courseId,
            },
          });
        console.log(createPrerequisite);
      }
    }
    return result;
  });

  //*populate the preRequisite if present
  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course!!');
};

const getAllFromDB = async (
  filters: ICourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: courseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
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
  const total = await prisma.course.count({
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

const getByIdFromDB = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<ICourseCreateData>
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  //*start transaction
  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id: id,
      },
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }

    //if the courses have any preRequisite and we have to update it then

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //*separate the course id which i have to delete
      const deletePrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite?.courseId && coursePrerequisite?.isDeleted
      );

      //*separate the other courses which is not deleted by the user
      const newPreRequisite = preRequisiteCourses.filter(
        coursePreRequisite =>
          coursePreRequisite?.courseId && !coursePreRequisite?.isDeleted
      );

      //*handle delete
      for (let index = 0; index < deletePrerequisite.length; index++) {
        await transactionClient.courseToPrerequisite.deleteMany({
          where: {
            AND: [
              { courseId: id },
              {
                preRequisiteId: deletePrerequisite[index].courseId,
              },
            ],
          },
        });
      }

      //*handle create
      for (let index = 0; index < newPreRequisite.length; index++) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: id,
            preRequisiteId: newPreRequisite[index].courseId,
          },
        });
      }
    }
    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};

const deleteByIdFromDB = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequisite.deleteMany({
    where: {
      OR: [
        {
          courseId: id,
        },
        {
          preRequisiteId: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateOneInDB,
};
