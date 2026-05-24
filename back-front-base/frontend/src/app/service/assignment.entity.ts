import { User } from "../entities/user.entity";
import { Category } from "./category.entity";

export type Assignment = {
    id?: string;
    title: string;
    studentcount?: number;
    completedCount?: number;
    completed?: boolean;
    createdAt: Date;
    createdBy: User|string;
    categoryId?: Category|string;
    student?: { 
        studentId: string; 
        completed: boolean 
    }[];
};