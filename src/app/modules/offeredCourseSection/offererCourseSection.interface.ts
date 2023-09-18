export type IOfferedCourse = {
  title: string;
  maxCapacity: number;
  currentlyEnrolledStudent?: number | undefined;
  offeredCourseId: string;
  semesterRegistrationId: string;
};
