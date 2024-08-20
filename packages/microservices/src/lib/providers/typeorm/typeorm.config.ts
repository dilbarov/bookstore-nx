import { DataSourceOptions, EntitySchema, MixedList } from 'typeorm'

export type ConnectionType = Extract<DataSourceOptions['type'], 'postgres'>

export const typeormConfig = (
  url: string,
  type: ConnectionType,
  entities: MixedList<string | Function | EntitySchema>
): DataSourceOptions => {
  return {
    type,
    entities,
    url,
    synchronize: false
  }
}
