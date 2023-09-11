export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: IPreRequisiteCourseRequest[];
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};

export type IPreRequisiteCourseRequest = {
  //array of object
  courseId: string;
  isDeleted?: null;
};
