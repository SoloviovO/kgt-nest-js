import { BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';
import { AppError } from '../constants/errors';

export function isValidObjectId(id: string) {
  const validID = mongoose.Types.ObjectId.isValid(id);

  if (!validID) {
    throw new BadRequestException(AppError.ID_NOT_VALID);
  }
}
