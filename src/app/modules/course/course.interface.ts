export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    //array of object
    courseId: string;
    isDeleted?: null;
  }[];
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
