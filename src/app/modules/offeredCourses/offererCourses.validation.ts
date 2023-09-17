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

export const offeredCourseValidation = {
  create,
};
