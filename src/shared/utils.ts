import { Weekdays } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
};

//*utils for offeredCourseClassSchedule(create)
export const hasTimeConflict = (
  existingSlots: {
    startTime: string;
    endTime: string;
    dayOfWeek: Weekdays;
  }[],
  newSlot: {
    startTime: string;
    endTime: string;
    dayOfWeek: Weekdays;
  }
): boolean => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.startTime}:00`);

    // existing : 12.30 - 13.30
    //new slot : 12.50 -13.50

    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }

  return false;
};
