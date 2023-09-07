import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingSearchableFields } from './building.constrains';
import { IBuildingFilterRequest } from './buling.interface';

const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

//*get all Building
const getAllFromDB = async (
  filter: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filter;

  //*redesign the filer searchTerm
  const andConditions = [];

  //*partial match
  if (searchTerm) {
    andConditions.push({
      OR: buildingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  //*handle where conditions in prisma
  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereConditions,
    //*handing sorting =>  sortBy, sortOrder comes from options
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.building.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

//*get single building

const getByIdFromDB = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const buildingService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
