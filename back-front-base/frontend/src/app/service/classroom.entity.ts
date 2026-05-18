import { User } from "../entities/user.entity";

export type Classroom={
    id?:string;
    name:string;
    studentCount?:number;
    student: string[];
    createdBy:User;
}