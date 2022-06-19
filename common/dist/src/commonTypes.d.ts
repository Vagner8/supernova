export declare type Projection<T> = {
    [Key in keyof T]?: T[Key] extends Object ? Projection<T[Key]> | 0 | 1 : 1 | 0;
};
export interface ImgsType {
    avatar: string[];
    photos: string[];
}
//# sourceMappingURL=commonTypes.d.ts.map