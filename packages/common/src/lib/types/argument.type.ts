export type ArgumentType<T> = T extends (arg: infer U) => void ? U : never;
