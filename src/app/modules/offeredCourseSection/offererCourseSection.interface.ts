export type IOfferedCourse = {
  title: string;
  maxCapacity: number;
  currentlyEnrolledStudent?: number | undefined;
  offeredCourseId: string;
  semesterRegistrationId: string;
};

export type IOfferedCourseSectionFilterRequest = {
  searchTerm?: string | undefined;
  offeredCourseId?: string | undefined;
  semesterRegistrationId?: string | undefined;
};
