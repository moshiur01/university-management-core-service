import { SemesterRegistrationStatus } from '@prisma/client';
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

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z
      .enum(
        [...Object.values(SemesterRegistrationStatus)] as [string, ...string[]], //either array of string or empty object
        {}
      )
      .optional(),
    minimunCredit: z.number().optional(),
    maximumCredit: z.number().optional(),
    academicSemesterId: z.string().optional(),
  }),
});

export const semesterRegistrationValidation = {
  create,
  update,
};
