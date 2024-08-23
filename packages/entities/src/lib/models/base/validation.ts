import { validateSync } from 'class-validator';

export const validateAggregationModel = (model: any) => {
  const errors = validateSync(model)

  if (errors.length > 0) {
    throw new Error(`Page not valid\n ${errors.join('\n')}`)
  }
}
