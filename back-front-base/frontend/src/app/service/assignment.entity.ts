import { User } from "../entities/user.entity";
import { Classroom } from "./classroom.entity";

export type Assignment = {
    id?: string;
    title: string;
    studentcount?: number;
    completedCount?: number;
    completed?: boolean;
    createdAt: Date;
    createdBy: User|string;
    classroomId?: Classroom|string;
    student?: { 
        studentId: string; 
        completed: boolean 
    }[];
};