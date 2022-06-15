export type Projection<T> = {
  [Key in keyof T]?: T[Key] extends Object
    ? Projection<T[Key]> | 0 | 1
    : 1 | 0;
};