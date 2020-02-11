export interface IGetUsers {
    all: string[];
    read: string[];
    write: string[];
    delete: undefined[];
}
export interface IPermissions {
    [key: string]: IGetUsers;
}
export interface IUsers {
      reviewerEmail: string; traineeEmail: string;
}
