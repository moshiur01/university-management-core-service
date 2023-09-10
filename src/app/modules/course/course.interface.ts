export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    //array of object
    courseId: string;
  }[];
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
