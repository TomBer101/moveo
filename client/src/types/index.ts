export type ITaskStatus = 'open' | 'in progress' | 'completed';

export interface IUser {
    _id: string;
    name: string;
    role: IUserRole;
}

export interface ITag {
    _id: string;
    name: string;
}

export interface ITask {
    _id: string;
    name?: string;
    status: ITaskStatus;
    suggestedTaskId?: string;
    suggestedTask?: {
        _id: string;
        name: string;
        tags: string[];
    };
}

export interface ICall {
    _id: string;
    name: string;
    tags: string[];
    tasks: ITask[];
}

export interface ILoginResponse {
    success: boolean;
    message: string;
    user: IUser;
}

export interface IRegisterResponse {
    success: boolean;
    message: string;
    user: IUser;
}

export interface ISuggestedTask extends ITask {
    tags: string[];
}

export type IUserRole = 'admin' | 'user';