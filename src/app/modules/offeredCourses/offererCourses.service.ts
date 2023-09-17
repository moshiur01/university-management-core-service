import { OfferedCourse } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICreateOfferedCourse } from './offererCourses.interface';

const insertIntoDb = async (
  data: ICreateOfferedCourse
): Promise<OfferedCourse[]> => {
  const { academicDepertmentId, semesterRegistrationId, courseIds } = data;

  const result: OfferedCourse[] = [];

  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourse.findFirst({
      where: {
        academicDepertmentId,
        semesterRegistrationId,
        courseId,
      },
    });

    if (!alreadyExist) {
      const insertOfferedCourse = await prisma.offeredCourse.create({
        data: {
          academicDepertmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });

      result.push(insertOfferedCourse);
    }

    // else {
    //   throw new ApiError(
    //     httpStatus.BAD_REQUEST,
    //     'Data already exists in Offered Courses'
    //   );
    // }
  });

  return result;
};

export const offeredCourseService = {
  insertIntoDb,
};
