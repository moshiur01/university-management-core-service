import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';

const checkRoomAvailable = async (data: OfferedCourseClassSchedule) => {
  const alreadyBookedRoomNoDay =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        room: {
          id: data.roomId,
        },
      },
    });
  // console.log(alreadyBookedRoomNoDay);

  const existingSlots = alreadyBookedRoomNoDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  //*if there are some overwrite time issue in creating new classes
  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Room is already booked in that particular time slot'
    );
  }
};

const checkFacultyAvailable = async (data: OfferedCourseClassSchedule) => {
  const alreadyFacultyAssigned =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        faculty: {
          id: data.facultyId,
        },
      },
    });

  const existingSlots = alreadyFacultyAssigned.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  console.log(existingSlots);
  console.log(newSlot);

  //*if there are some overwrite time issue in creating new class schedule
  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Faculty is already booked in that particular time slot'
    );
  }
};

export const offeredCourseClassScheduleUtils = {
  checkRoomAvailable,
  checkFacultyAvailable,
};
