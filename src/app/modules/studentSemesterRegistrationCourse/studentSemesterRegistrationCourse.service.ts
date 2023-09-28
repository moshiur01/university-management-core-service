import { SemesterRegistrationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IEnrollIntoCoursePayload } from '../semesterRegistration/semesterRegistration.interface';

const enrollIntoCourse = async (
  authUserId: string,
  payload: IEnrollIntoCoursePayload
): Promise<{ message: string }> => {
  //find student data
  const student = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }

  //find semester registration data
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'semester Registration not found');
  }

  //find offered course
  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload?.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  //find offered course section
  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload?.offeredCourseSectionId,
    },
  });
  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Offered course section not found'
    );
  }

  if (
    offeredCourseSection.maxCapacity &&
    offeredCourseSection.currentlyEnrolledStudent &&
    offeredCourseSection.currentlyEnrolledStudent >=
      offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student capacity is full');
  }

  //create the data
  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentSemesterRegistrationCourse.create({
      data: {
        studentId: student?.id,
        semesterRegistrationId: semesterRegistration?.id,
        offeredCourseId: payload?.offeredCourseId,
        offeredCourseSectionId: payload?.offeredCourseSectionId,
      },
    });

    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },

      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });

    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistraion: {
          id: semesterRegistration.id,
        },
      },

      data: {
        totalCreditTaken: {
          increment: offeredCourse.course.credits,
        },
      },
    });
  });

  return {
    message: 'Successfully enroll Into Course',
  };
};

const withdrawFromCourse = async (
  authUserId: string,
  payload: IEnrollIntoCoursePayload
): Promise<{ message: string }> => {
  //find student data
  const student = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }

  //find semester registration data
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'semester Registration not found');
  }

  //find offered course
  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload?.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  //delete the data
  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentSemesterRegistrationCourse.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: semesterRegistration.id,
          studentId: student.id,
          offeredCourseId: offeredCourse.id,
        },
      },
    });

    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },

      data: {
        currentlyEnrolledStudent: {
          decrement: 1,
        },
      },
    });

    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistraion: {
          id: semesterRegistration.id,
        },
      },

      data: {
        totalCreditTaken: {
          decrement: offeredCourse.course.credits,
        },
      },
    });
  });

  return {
    message: 'Successfully withdraw from course',
  };
};

export const studentSemesterRegistrationCourseService = {
  enrollIntoCourse,
  withdrawFromCourse,
};
