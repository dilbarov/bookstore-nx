import { EXCHANGE_USER } from './user.exchange';
import { EXCHANGE_AUTH } from './auth.exchange';

export * from './auth.exchange';
export * from './user.exchange';

export const IDENTITY_EXCHANGES = [EXCHANGE_AUTH, EXCHANGE_USER];
