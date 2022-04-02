export enum Clusters {
    ServerSuperAdmin = 'server-super-admin'
}

export enum Collections {
    Users = 'users'
}

export interface User {
    name: string
    surname: string
    email: string
    password: string
}