import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;

  //*update
  if (error.code === 'p2025') {
    message = (error.meta?.cause as string) || 'Record Not Found';
    errors = [
      {
        path: '',
        message,
      },
    ];
  }

  //*foreign key deletion
  else if (error.code === 'p2003') {
    if (error.message.includes('delete() invocation:')) {
      message = 'Delete Failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleClientError;
