export type ISemesterRegistrationFilterRequest = {
  searchTerm?: string | undefined;
  academicSemesterId?: string | undefined;
};

export type IEnrollIntoCoursePayload = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
