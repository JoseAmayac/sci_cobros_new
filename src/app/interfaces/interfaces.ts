export interface User {
    id?:number,
    name?:string,
    dni?:string,
    cellphone?:string,
    address?:string,
    lastname?:string,
    email?:string,
    password?:string,
    password_confirmation?:string,
    role?:Role,
    route?:Route
    created_at?:Date,
    updated_at?:Date,
    username?:string
}

export interface Role{
    id?:number,
    name?:string,
    description?:string
}

export interface Route{
    id?:number,
    name?:string,
    ammount?:number,
    created_at?:Date,
    updated_at?:Date
}

export interface Vehicle{
    id?:number,
    license_plate?: string,
    mark?: string,
    model?: number,
    cylindering?: number,
    papers_due_date?: Date
}
export interface GeneralInformation
{
    routes?: Route[],
    vehicles?: Vehicle[],
    clients?: User[],
    employees?: User[]
}
