export const semesterRegistrationFilterableFields: string[] = [
  'searchTerm',
  'id',
  'academicSemesterId',
  'status',
];

export const semesterRegistrationSearchableFields: string[] = [];

//relational
export const semesterRegistrationRelationalFields: string[] = [
  'academicSemesterId',
];
export const semesterRegistrationRelationalFieldsMapper: {
  [key: string]: string;
} = {
  academicSemesterId: 'academicSemester',
};
