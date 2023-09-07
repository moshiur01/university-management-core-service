import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});

export const buildingValidation = { create, update };
