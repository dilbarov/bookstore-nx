import { Any } from '@bookstore-nx/common';

export interface IBaseFacade {
  commands: {
    [key: string]: (...args: Any[]) => Any;
  };
  queries: {
    [key: string]: (...args: Any[]) => Any;
  };
  events: {
    [key: string]: (...args: Any[]) => void;
  };
}
