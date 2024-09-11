import { validateSync } from 'class-validator';
import { Any } from '@bookstore-nx/common';

export const validateAggregationModel = (model: Any) => {
  const errors = validateSync(model);

  if (errors.length > 0) {
    throw new Error(`Model not valid\n ${errors.join('\n')}`);
  }
};
