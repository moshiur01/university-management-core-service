import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepertmentId: z.string({
      required_error: ' academic Semester ID Is needed',
    }),
    semesterRegistrationId: z.string({
      required_error: ' Semester registration ID Is needed',
    }),
    courseIds: z.array(
      z.string({
        required_error: ' Course ID Is needed',
      }),

      {
        required_error: 'Course Ids are required',
      }
    ),
  }),
});

const update = z.object({
  body: z.object({
    semesterRegistrationId: z.string().optional(),
    courseId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
  }),
});

export const offeredCourseValidation = {
  create,
  update,
};
