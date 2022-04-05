export enum Clusters {
    ServerSuperAdmin = 'server-super-admin'
}

export enum Collections {
    Users = 'users',
    Settings = 'settings'
}

export interface User {
    _id: string
    name: string
    surname: string
    email: string
    password: string
    selected: boolean
}