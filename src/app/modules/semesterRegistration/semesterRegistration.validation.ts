import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'start date is required',
    }),
    endDate: z.string({
      required_error: 'End date is required',
    }),
    minimunCredit: z.number({
      required_error: 'minimun credit is required',
    }),
    maximumCredit: z.number({
      required_error: 'maximum credit  is required',
    }),
    academicSemesterId: z.string({
      required_error: 'academic Semester Id date is required',
    }),
  }),
});

export const semesterRegistrationValidation = {
  create,
};
